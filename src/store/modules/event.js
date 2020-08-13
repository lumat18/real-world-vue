import EventService from "../../services/EventService";

export default {
  namespaced: true,
  state: {
    events: [],
    totalCount: 0,
    event: {}
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
    createEvent({ commit, rootState }, event) {
      console.log("User creating the Event is: " + rootState.user.user.name);
      return EventService.postEvent(event).then(() => {
        commit("ADD_EVENT", event);
      });
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then(response => {
          commit("SET_EVENTS", response.data);
          commit("SET_TOTAL_COUNT", response.headers["x-total-count"]);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id);
      if (event) {
        commit("SET_EVENT", event);
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit("SET_EVENT", response.data);
          })
          .catch(error => {
            console.log(error);
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
