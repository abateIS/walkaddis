import axios from 'axios'

const API_BASE_URL = 'https://walk-addis.infinityfreeapp.com/'


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getEvents = async (category = null) => {
  const params = category ? { category } : {}
  const response = await api.get('/events.php', { params })
  return response.data.events
}

export const getCategories = async () => {
  const response = await api.get('/categories.php')
  return response.data.categories
}

export const submitContact = async (data) => {
  const response = await api.post('/contact.php', data)
  return response.data
}

export const createEvent = async (eventData) => {
  const response = await api.post('/events.php', eventData)
  return response.data
}

export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/login.php', credentials)
  return response.data
}

export const deleteEvent = async (eventId) => {
  const response = await api.delete(`/events.php?id=${eventId}`)
  return response.data
}

export const getAllEvents = async (includeExpired = false) => {
  const params = includeExpired ? { status: 'all' } : {}
  const response = await api.get('/events.php', { params })
  return response.data.events
}

export const getMessages = async () => {
  const response = await api.get('/messages.php')
  return response.data.messages
}

export const deleteMessage = async (messageId) => {
  const response = await api.delete(`/messages.php?id=${messageId}`)
  return response.data
}

export default api

