import { useState, useEffect } from 'react'
import { getCategories, createEvent, adminLogin, deleteEvent, getAllEvents, getMessages, deleteMessage } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { format } from 'date-fns'

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState(null)
  const [activeTab, setActiveTab] = useState('create') // 'create', 'manage', or 'messages'
  const [categories, setCategories] = useState([])
  const [events, setEvents] = useState([])
  const [messages, setMessages] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(false)
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    venue: '',
    address: '',
    event_date: '',
    image_url: '',
    ticket_price: '',
    ticket_url: '',
    contact_email: '',
    contact_phone: '',
    organizer_name: '',
    is_featured: false
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(null)

  useEffect(() => {
    if (isLoggedIn) {
      loadCategories()
      if (activeTab === 'manage') {
        loadEvents()
      } else if (activeTab === 'messages') {
        loadMessages()
      }
    }
  }, [isLoggedIn, activeTab])

  const loadCategories = async () => {
    try {
      const cats = await getCategories()
      setCategories(cats)
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  const loadEvents = async () => {
    try {
      setLoadingEvents(true)
      const allEvents = await getAllEvents(true) // Get all events including expired
      setEvents(allEvents)
    } catch (err) {
      console.error('Failed to load events:', err)
      setError('Failed to load events')
    } finally {
      setLoadingEvents(false)
    }
  }

  const loadMessages = async () => {
    try {
      setLoadingMessages(true)
      const allMessages = await getMessages()
      setMessages(allMessages)
    } catch (err) {
      console.error('Failed to load messages:', err)
      setError('Failed to load messages')
    } finally {
      setLoadingMessages(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError(null)
    try {
      await adminLogin(loginData)
      setIsLoggedIn(true)
    } catch (err) {
      setLoginError(err.response?.data?.error || 'Login failed')
    }
  }

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const eventData = {
        ...formData,
        category_id: parseInt(formData.category_id),
        ticket_price: parseFloat(formData.ticket_price) || 0,
        event_date: new Date(formData.event_date).toISOString().slice(0, 19).replace('T', ' ')
      }
      await createEvent(eventData)
      setSuccess(true)
      setFormData({
        title: '',
        description: '',
        category_id: '',
        venue: '',
        address: '',
        event_date: '',
        image_url: '',
        ticket_price: '',
        ticket_url: '',
        contact_email: '',
        contact_phone: '',
        organizer_name: '',
        is_featured: false
      })
      // Reload events if on manage tab
      if (activeTab === 'manage') {
        loadEvents()
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (eventId, eventTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
      return
    }

    try {
      setDeleteLoading(eventId)
      await deleteEvent(eventId)
      setEvents(events.filter(e => e.id !== eventId))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete event')
      setTimeout(() => setError(null), 5000)
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleDeleteMessage = async (messageId, organizerName) => {
    if (!window.confirm(`Are you sure you want to delete the message from "${organizerName}"? This action cannot be undone.`)) {
      return
    }

    try {
      setDeleteLoading(messageId)
      await deleteMessage(messageId)
      setMessages(messages.filter(m => m.id !== messageId))
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete message')
      setTimeout(() => setError(null), 5000)
    } finally {
      setDeleteLoading(null)
    }
  }

  const isEventExpired = (eventDate) => {
    return new Date(eventDate) < new Date()
  }

  const getEventStatus = (event) => {
    if (event.status === 'cancelled') return { text: 'Cancelled', color: 'bg-red-100 text-red-800' }
    if (event.status === 'completed') return { text: 'Completed', color: 'bg-gray-100 text-gray-800' }
    if (isEventExpired(event.event_date)) return { text: 'Expired', color: 'bg-orange-100 text-orange-800' }
    return { text: 'Active', color: 'bg-green-100 text-green-800' }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12 transition-colors duration-200">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img 
                  src="/assets/logo.svg" 
                  alt="Walk Addis Logo" 
                  className="h-12 w-auto"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">Admin Login</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your events and content</p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-md">
                <p className="text-red-800 dark:text-red-300 text-sm font-medium">{loginError}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="admin@walkaddis.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white py-3 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-6 sm:py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 mb-6 transition-colors duration-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Event Management</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">Create and manage your events</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-6 transition-colors duration-200 overflow-x-auto">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px min-w-max sm:min-w-0">
              <button
                onClick={() => setActiveTab('create')}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'create'
                    ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Create Event
              </button>
              <button
                onClick={() => {
                  setActiveTab('manage')
                  loadEvents()
                }}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'manage'
                    ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Manage Events
                {events.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                    {events.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setActiveTab('messages')
                  loadMessages()
                }}
                className={`px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'messages'
                    ? 'border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                Messages
                {messages.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full">
                    {messages.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg">
            <p className="text-green-800 dark:text-green-300 font-medium">✓ Operation successful!</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-800 dark:text-red-300 font-medium">{error}</p>
          </div>
        )}

        {/* Create Event Tab */}
        {activeTab === 'create' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 transition-colors duration-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="Enter event title"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="Describe your event..."
                  />
                </div>

                <div>
                  <label htmlFor="category_id" className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    required
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="event_date" className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Date & Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    id="event_date"
                    name="event_date"
                    required
                    value={formData.event_date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="venue" className="block text-sm font-semibold text-gray-700 mb-2">
                    Venue <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    required
                    value={formData.venue}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="Venue name"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="Full address"
                  />
                </div>

                <div>
                  <label htmlFor="organizer_name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Organizer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="organizer_name"
                    name="organizer_name"
                    required
                    value={formData.organizer_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="Organizer name"
                  />
                </div>

                <div>
                  <label htmlFor="ticket_price" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ticket Price (ETB)
                  </label>
                  <input
                    type="number"
                    id="ticket_price"
                    name="ticket_price"
                    step="0.01"
                    min="0"
                    value={formData.ticket_price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="image_url" className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    id="image_url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="ticket_url" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ticket Purchase URL
                  </label>
                  <input
                    type="url"
                    id="ticket_url"
                    name="ticket_url"
                    value={formData.ticket_url}
                    onChange={handleChange}
                    placeholder="https://example.com/tickets"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact_email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="contact@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="contact_phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    placeholder="+251 XXX XXX XXX"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      name="is_featured"
                      checked={formData.is_featured}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="ml-3 text-sm font-medium text-gray-700">
                      Feature this event on homepage
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </button>
            </form>
          </div>
        )}

        {/* Manage Events Tab */}
        {activeTab === 'manage' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">All Events</h2>
              <button
                onClick={loadEvents}
                className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors w-full sm:w-auto"
              >
                Refresh
              </button>
            </div>

            {loadingEvents ? (
              <LoadingSpinner />
            ) : events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No events found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {events.map((event) => {
                      const status = getEventStatus(event)
                      const eventDate = new Date(event.event_date)
                      return (
                        <tr
                          key={event.id}
                          className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                            isEventExpired(event.event_date) ? 'opacity-75' : ''
                          }`}
                        >
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {event.image_url ? (
                                <img
                                  src={event.image_url}
                                  alt={event.title}
                                  className="h-12 w-12 rounded-lg object-cover mr-4"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mr-4">
                                  <span className="text-white text-sm font-bold">
                                    {event.category_name.charAt(0)}
                                  </span>
                                </div>
                              )}
                              <div>
                                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                  {event.title}
                                  {event.is_featured && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
                                      Featured
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{event.venue}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">
                              {format(eventDate, 'MMM dd, yyyy')}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {format(eventDate, 'h:mm a')}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                              {status.text}
                            </span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600 dark:text-gray-400">{event.category_name}</span>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDelete(event.id, event.title)}
                              disabled={deleteLoading === event.id}
                              className="px-3 sm:px-4 py-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-xs sm:text-sm w-full sm:w-auto"
                            >
                              {deleteLoading === event.id ? 'Deleting...' : 'Delete'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 transition-colors duration-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">User Messages</h2>
              <button
                onClick={loadMessages}
                className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors w-full sm:w-auto"
              >
                Refresh
              </button>
            </div>

            {loadingMessages ? (
              <LoadingSpinner />
            ) : messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📬</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">No messages yet.</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                  User event submission requests will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600 transition-colors duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-700 flex items-center justify-center text-white font-bold">
                            {message.organizer_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {message.organizer_name}
                            </h3>
                            {message.organization && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {message.organization}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <svg
                              className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            <a
                              href={`mailto:${message.email}`}
                              className="text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              {message.email}
                            </a>
                          </div>
                          {message.phone && (
                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                              <svg
                                className="w-4 h-4 mr-2 text-primary-600 dark:text-primary-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                              <a
                                href={`tel:${message.phone}`}
                                className="text-primary-600 dark:text-primary-400 hover:underline"
                              >
                                {message.phone}
                              </a>
                            </div>
                          )}
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {format(new Date(message.created_at), 'MMM dd, yyyy h:mm a')}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteMessage(message.id, message.organizer_name)}
                        disabled={deleteLoading === message.id}
                        className="px-4 py-2 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm w-full sm:w-auto"
                      >
                        {deleteLoading === message.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
