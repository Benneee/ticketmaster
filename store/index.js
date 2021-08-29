const BASE_URL = process.env.API_BASE_URL

export const state = () => ({
  tickets: [],
  eventsInfo: {
    events: [],
    pageData: {},
  },
  loadingState: false,
})

export const getters = {
  events: (state) => state.eventsInfo.events,
  isLoading: (state) => state.loadingState,
  tickets: (state) => state.tickets,
  pageInfo: (state) => state.eventsInfo.pageData,
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

  clearTickets({ commit }) {
    commit('clear')
  },

  setLoadingState({ commit }, loadingState) {
    commit('setLoading', loadingState)
  },

  // registerForFreeEvent({ commit }, eventId, data) {

  // }
}
