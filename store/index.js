const BASE_URL = process.env.API_BASE_URL

export const state = () => ({
  tickets: [],
  eventsInfo: {
    events: [],
    pageData: {},
  },
  event: {},
  loadingState: false,
})

export const getters = {
  events: (state) => state.eventsInfo.events,
  isLoading: (state) => state.loadingState,
  tickets: (state) => state.tickets,
  pageInfo: (state) => state.eventsInfo.pageData,
  event: (state) => state.event,
}

export const mutations = {
  setLoading(state, loadingState) {
    state.loadingState = loadingState
  },

  clear(state) {
    state.tickets.length = 0
    state.tickets = []
  },

  setEvents(state, eventsData) {
    state.eventsInfo.events.push(...eventsData)
  },

  setPageData(state, pageData) {
    state.eventsInfo.pageData = { ...pageData }
  },

  setEvent(state, eventData) {
    state.event = { ...eventData }
  },

  setEventTickets(state, eventTickets) {
    state.tickets = [...eventTickets]
  },

  increaseEventTicketCount(state, ticketId) {
    const ticketIdx = state.tickets.findIndex(
      (ticket) => ticket.id === ticketId
    )
    const ticketToIncrement = state.tickets[ticketIdx]
    if (ticketToIncrement.count > ticketToIncrement.qty_available) {
      ticketToIncrement.count = ticketToIncrement.qty_available
    } else if (ticketToIncrement.count < ticketToIncrement.qty_available) {
      ticketToIncrement.count++
    } else {
      ticketToIncrement.count = ticketToIncrement.qty_available
    }
    state.tickets.splice(ticketIdx, 1, ticketToIncrement)
  },

  decreaseEventTicketCount(state, ticketId) {
    const ticketIdx = state.tickets.findIndex(
      (ticket) => ticket.id === ticketId
    )
    const ticketToDecrement = state.tickets[ticketIdx]
    /**
     * Remember I disable the "DecreaseCount" button
     * when the count of a particular ticket is 0, so there's little
     * to no chance 0 will be sent here :)
     */
    ticketToDecrement.count--
    state.tickets.splice(ticketIdx, 1, ticketToDecrement)
  },
}

export const actions = {
  setLoadingState({ commit }, loadingState) {
    commit('setLoading', loadingState)
  },

  // Event actions
  async getEvent({ commit }, eventId) {
    commit('setLoading', true)
    try {
      const { data } = await fetch(`${BASE_URL}/events/${eventId}`).then(
        (res) => {
          return res.json()
        }
      )
      const ticketData = await fetch(
        `${BASE_URL}/ticket-types/events/${eventId}`
      ).then((res) => res.json())

      data.ticket = ticketData.data
      commit('setEvent', data)
      commit('setLoading', false)
    } catch (error) {
      this.$toast.error('Error in getting events', error)
      commit('setLoading', false)
    }
  },

  async getEvents({ commit }, page) {
    commit('setLoading', true)
    try {
      const { data } = await fetch(`${BASE_URL}/events?page=${page}`).then(
        (res) => {
          return res.json()
        }
      )
      const events = await Promise.all(
        data.events.map(async (event) => {
          const { data } = await fetch(
            `${BASE_URL}/ticket-types/events/${event.id}`
          ).then((res) => res.json())
          event.ticket = data
          event.ticket.map((tkt) => {
            tkt.count = 0
            return tkt
          })
          return event
        })
      )
      commit('setEvents', events)
      commit('setPageData', data.pageInfo)
      commit('setLoading', false)
    } catch (error) {
      this.$toast.error('Error in getting events')
      commit('setLoading', false)
    }
  },

  async registerForFreeEvent({ commit }, eventId, req) {
    const response = await fetch(`${BASE_URL}/events/${eventId}/register`, {
      method: 'POST',
      body: req,
    })
    return response.json()
  },
  // Event actions end

  // Ticket actions
  setTickets({ commit }, eventTickets) {
    commit('setEventTickets', eventTickets)
  },

  clearTickets({ commit }) {
    commit('clear')
  },

  increaseTicket({ commit }, ticketId) {
    commit('increaseEventTicketCount', ticketId)
  },

  decreaseTicket({ commit }, ticketId) {
    commit('decreaseEventTicketCount', ticketId)
  },

  async createOrder({ commit }, req) {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      body: req,
      mode: 'no-cors',
    })
    return response.json()
  },
  // Ticket actions end
}
