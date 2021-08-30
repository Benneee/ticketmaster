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
}

export const actions = {
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
          return event
        })
      )
      commit('setEvents', events)
      commit('setPageData', data.pageInfo)
      commit('setLoading', false)
    } catch (error) {
      this.$toast.error('Error in getting events')
    }
  },

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
    }
  },

  clearTickets({ commit }) {
    commit('clear')
  },

  setLoadingState({ commit }, loadingState) {
    commit('setLoading', loadingState)
  },

  async registerForFreeEvent({ commit }, eventId, req) {
    const response = await fetch(`${BASE_URL}/events/${eventId}/register`, {
      method: 'POST',
      body: req,
    })
    return response.json()
  },
}
