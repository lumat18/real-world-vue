<template>
  <div>
    <h1>Oops!</h1>
    <h3>The {{ resource }} your're looking for is not here.</h3>
    <router-link :to="{ name: 'event-list' }"
      >Back to the home page</router-link
    >
  </div>
</template>

<script>
export default {
  name: "NotFound",
  props: {
    resource: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
