import { useState, useEffect } from 'react'
import { getEvents, getCategories } from '../services/api'
import EventCard from '../components/EventCard'
import CategoryFilter from '../components/CategoryFilter'
import LoadingSpinner from '../components/LoadingSpinner'
import AnimatedCounter from '../components/AnimatedCounter'

export default function Home() {
  const [events, setEvents] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadData()
  }, [selectedCategory])

  const loadData = async () => {
    try {
      setLoading(true)
      const [eventsData, categoriesData] = await Promise.all([
        getEvents(selectedCategory),
        getCategories()
      ])
      setEvents(eventsData)
      setCategories(categoriesData)
      setError(null)
    } catch (err) {
      setError('Failed to load events. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug === 'all' ? null : categorySlug)
  }

  const featuredEvents = events.filter(e => e.is_featured)
  const regularEvents = events.filter(e => !e.is_featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
      {/* Hero Section with Animated Background */}
      <div className="relative bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 dark:from-orange-800 dark:via-orange-900 dark:to-orange-950 text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/024/234/201/small/elegant-golden-stage-horizontal-glowing-with-lighting-effect-sparkle-on-dark-background-template-premium-award-design-vector.jpg)',
            opacity: 0.75
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/85 via-orange-800/75 to-orange-900/85 dark:from-black/70 dark:via-orange-950/60 dark:to-black/70"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shimmer"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/30">
                🎉 Discover Events in Addis Ababa
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-200 bg-clip-text text-transparent animate-gradient">
                Events
              </span>
        </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-10 px-4 leading-relaxed">
              Find music concerts, art exhibitions, sports events, and more happening in the vibrant city of Addis Ababa
            </p>
            
            {/* Animated Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 px-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 sm:px-8 py-4 sm:py-5 min-w-[140px] border border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">
                  <AnimatedCounter end={events.length} duration={2000} />
                </div>
                <div className="text-xs sm:text-sm text-orange-100 font-medium">Events Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 sm:px-8 py-4 sm:py-5 min-w-[140px] border border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">
                  <AnimatedCounter end={categories.length} duration={2000} />
                </div>
                <div className="text-xs sm:text-sm text-orange-100 font-medium">Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 sm:px-8 py-4 sm:py-5 min-w-[140px] border border-white/20 shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1">
                  <AnimatedCounter end={featuredEvents.length} duration={2000} />
                </div>
                <div className="text-xs sm:text-sm text-orange-100 font-medium">Featured</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 sm:h-16 md:h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,60 C300,100 600,20 900,60 C1050,80 1150,40 1200,60 L1200,120 L0,120 Z"
              fill="rgb(249 250 251)"
              className="dark:fill-gray-900"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
        </div>

        {/* Events Section */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-lg max-w-md mx-auto">
              <p className="text-red-800 dark:text-red-300 text-lg font-medium mb-4">{error}</p>
          <button
            onClick={loadData}
                className="px-6 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium"
          >
            Retry
          </button>
            </div>
        </div>
      ) : events.length === 0 ? (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-600 dark:text-gray-400 text-xl font-medium mb-2">No events found</p>
              <p className="text-gray-500 dark:text-gray-500">
                {selectedCategory
                  ? `No events in this category yet. Try selecting a different category.`
                  : 'No events available at the moment. Check back soon!'}
              </p>
            </div>
        </div>
      ) : (
        <>
            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <div className="mb-8 sm:mb-12">
                <div className="flex items-center mb-6">
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                      <span className="mr-3 text-3xl">⭐</span>
                      Featured Events
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Don't miss these special events</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {featuredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* All Events */}
            <div>
          <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              {selectedCategory
                ? `${categories.find(c => c.slug === selectedCategory)?.name || 'Category'} Events`
                : 'All Events'}
            </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
              {events.length} {events.length === 1 ? 'event' : 'events'} found
            </p>
          </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {regularEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
              </div>
          </div>
        </>
      )}
      </div>
    </div>
  )
}
