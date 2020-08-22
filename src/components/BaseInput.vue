<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
      :class="inputClass"
    />
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFieldMixin";

export default {
  name: "BaseInput.vue",
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  }
};
</script>

<style scoped></style>
