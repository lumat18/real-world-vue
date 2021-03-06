import EventService from "../../services/EventService";

export default {
  namespaced: true,
  state: {
    events: [],
    totalCount: 0,
    event: {},
    perPage: 3
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_TOTAL_COUNT(state, totalCount) {
      state.totalCount = totalCount;
    },
    SET_EVENT(state, event) {
      state.event = event;
    }
  },
  actions: {
    createEvent({ commit, dispatch }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit("ADD_EVENT", event);
          const notification = {
            type: "success",
            message: "Your event has been created"
          };
          dispatch("notification/add", notification, { root: true });
        })
        .catch(error => {
          const notification = {
            type: "error",
            message: "There was a problem creating event, " + error.message
          };
          dispatch("notification/add", notification, { root: true });
          throw error;
        });
    },
    fetchEvents({ commit, state }, { page }) {
      return EventService.getEvents(state.perPage, page).then(response => {
        commit("SET_EVENTS", response.data);
        commit("SET_TOTAL_COUNT", response.headers["x-total-count"]);
      });
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);
      if (event) {
        commit("SET_EVENT", event);
        return event;
      } else {
        return EventService.getEvent(id).then(response => {
          commit("SET_EVENT", response.data);
          return response.data;
        });
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id);
    }
  }
};
