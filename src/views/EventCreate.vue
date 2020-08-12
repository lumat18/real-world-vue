<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ catLength }} categories:</p>
    <p>{{ getEventById(1) }}</p>
    <ul>
      <li v-for="category in categories" :key="category">{{ category }}</li>
    </ul>
    <div>
      <p>{{ count }}</p>
      <input type="number" v-model.number="incrementBy" />
      <button @click="incrementCount">Increment</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      incrementBy: 1
    };
  },
  computed: {
    catLength() {
      return this.$store.getters.catLength;
    },
    ...mapGetters({
      getEventById: "getEventById"
    }),
    ...mapState({
      user: "user",
      categories: "categories",
      count: "count"
    })
  },
  methods: {
    incrementCount() {
      this.$store.dispatch("updateCount", this.incrementBy);
    }
  }
};
</script>

<style scoped></style>
