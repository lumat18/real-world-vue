<template>
  <div>
    <h1>Event for {{ user.name }}</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page
      </router-link>
      |
    </template>
    <template v-if="isNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="prev"
        >Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from "../components/EventCard";
import { mapState } from "vuex";
import store from "../store/index";

function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1;
  store
    .dispatch("event/fetchEvents", { page: currentPage })
    .then(() => {
      routeTo.params.page = currentPage;
      next();
    })
    .catch(() => {
      next({ name: "network-issue" });
    });
}

export default {
  components: { EventCard },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next);
  },
  computed: {
    ...mapState("event", ["event", "events", "totalCount", "perPage"]),
    ...mapState({
      user: state => state.user.user
    }),
    isNextPage() {
      return this.totalCount > this.page * this.perPage;
    }
  }
};
</script>

<style scoped></style>
