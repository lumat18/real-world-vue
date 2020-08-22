<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        class="field"
        label="Select a category"
        v-model="event.category"
        :options="categories"
        :inputClass="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="error-message">
          Category is required
        </p>
      </template>
      <h3>Name & describe your event</h3>
      <BaseInput
        class="field"
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
        :inputClass="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="error-message">
          Title is required
        </p>
      </template>
      <BaseInput
        class="field"
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add a description"
        :inputClass="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="error-message">
          Description is required
        </p>
      </template>
      <h3>Where is your event?</h3>
      <BaseInput
        class="field"
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        :inputClass="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="error-message">
          Location is required
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          :input-class="{ error: $v.event.date.$error }"
          @closed="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="error-message">
          Date is required
        </p>
      </template>
      <BaseSelect
        class="field"
        label="Select time"
        v-model="event.time"
        :options="times"
        :inputClass="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="error-message">
          Time is required
        </p>
      </template>
      <BaseButton buttonClass="-fill-gradient">Submit</BaseButton>
    </form>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import NProgress from "nprogress";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    Datepicker
  },
  data() {
    const times = [];
    for (let i = 0; i <= 23; i++) {
      times.push(i + ":00");
    }
    return {
      event: this.createNewEvent(),
      times: times,
      categories: this.$store.state.categories
    };
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
  },
  methods: {
    createNewEvent() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 1000000);
      return {
        id: id,
        organizer: user,
        category: "",
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        attendees: []
      };
    },
    createEvent() {
      NProgress.start();
      this.$store
        .dispatch("event/createEvent", this.event)
        .then(() => {
          this.$router.push({
            name: "event-show",
            params: { id: this.event.id }
          });
          this.event = this.createNewEvent();
        })
        .catch(() => {
          NProgress.done();
        });
    }
  }
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
.error-message {
  color: tomato;
}
</style>
