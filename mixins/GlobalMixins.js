import * as moment from 'moment'

export default {
  methods: {
    formatDate(date) {
      return moment(date).format('Do MMMM YYYY')
    },

    formatDateTime(date) {
      return moment(date).format('Do, MMM YYYY, HH:mm a')
    },

    getPriceRange(tickets) {
      if (tickets) {
        if (tickets.length > 1) {
          const prices = []
          tickets.map((ticket) => prices.push(ticket.price))
          const lowest = Math.min(...prices)
          const highest = Math.max(...prices)
          const priceRangeValue = `N${lowest.toLocaleString()} - N${highest.toLocaleString()}`
          return priceRangeValue
        } else if (tickets.length === 1 && tickets[0]) {
          if (tickets[0].price) {
            return `N${tickets[0].price.toLocaleString()}`
          }
        }
      }
    },
  },
}
