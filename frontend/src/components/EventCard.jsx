import { format } from 'date-fns'

export default function EventCard({ event }) {
  const eventDate = new Date(event.event_date)
  const formattedDate = format(eventDate, 'MMM dd, yyyy')
  const formattedTime = format(eventDate, 'h:mm a')
  const isExpired = eventDate < new Date()

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
        event.is_featured ? 'ring-2 ring-primary-500 dark:ring-primary-400 ring-offset-2 dark:ring-offset-gray-800' : ''
      } ${isExpired ? 'opacity-75' : ''}`}
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
      {event.image_url ? (
        <img
          src={event.image_url}
          alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 dark:from-primary-600 dark:via-primary-700 dark:to-primary-800 flex items-center justify-center">
            <span className="text-white text-5xl sm:text-6xl font-bold opacity-50">
              {event.category_name.charAt(0)}
            </span>
        </div>
      )}
        {event.is_featured && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center">
              <span className="mr-1 hidden sm:inline">⭐</span>
              <span className="sm:hidden">⭐</span>
              <span className="hidden sm:inline">Featured</span>
            </span>
          </div>
        )}
        {isExpired && (
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
            <span className="bg-red-500 text-white text-xs font-bold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg">
              Expired
          </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 sm:p-4">
          <span className="inline-block bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
            {event.category_name}
          </span>
        </div>
        </div>
        
      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {event.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {event.description}
        </p>
        
        {/* Event Details */}
        <div className="space-y-3 mb-4 border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <svg
              className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{formattedDate}</div>
              <div className="text-gray-600 dark:text-gray-400">{formattedTime}</div>
            </div>
          </div>
          
          <div className="flex items-start text-sm text-gray-700 dark:text-gray-300">
            <svg
              className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">{event.venue}</div>
              <div className="text-gray-600 dark:text-gray-400 text-xs line-clamp-1">{event.address}</div>
            </div>
          </div>
          
          {event.ticket_price > 0 && (
            <div className="flex items-center text-sm">
              <svg
                className="w-5 h-5 mr-3 text-primary-600 dark:text-primary-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-bold text-gray-900 dark:text-white">
                ETB {event.ticket_price.toFixed(2)}
              </span>
            </div>
          )}
          {event.ticket_price === 0 && (
            <div className="flex items-center text-sm">
              <svg
                className="w-5 h-5 mr-3 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-semibold text-green-600 dark:text-green-400">Free Event</span>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 gap-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">by {event.organizer_name}</span>
          {event.ticket_url && !isExpired && (
            <a
              href={event.ticket_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white text-sm font-semibold rounded-lg hover:from-primary-700 hover:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              Get Tickets
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
