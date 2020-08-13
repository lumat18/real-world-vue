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

export default {
  components: { EventCard },
  created() {
    this.$store.dispatch("event/fetchEvents", {
      perPage: 3,
      page: this.page
    });
  },
  computed: {
    ...mapState({
      events: state => state.event.events,
      event: state => state.event.event,
      totalCount: state => state.event.totalCount,
      user: state => state.user.user
    }),
    page() {
      return parseInt(this.$route.query.page) || 1;
    },
    isNextPage() {
      return this.totalCount > this.page * 3;
    }
  }
};
</script>

<style scoped></style>
