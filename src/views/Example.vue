<template
  ><form @submit.prevent="submit">
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">Email is invalid</p>
      <p v-if="!$v.email.required" class="errorMessage">Email is required</p>
    </div>
    <input
      type="email"
      placeholder="What's your email?"
      v-model="email"
      @blur="$v.email.$touch()"
      :class="{ error: $v.email.$error }"
    />
    <button :disabled="$v.$invalid" type="submit">Submit</button>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Example",
  data() {
    return {
      email: null
    };
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$invalid) {
        console.log("Form submitted: ", this.email);
      }
    }
  }
};
</script>

<style scoped>
.errorMessage {
  color: tomato;
}
.error {
  border: 1px solid tomato;
}
</style>
