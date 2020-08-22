<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
      :class="inputClass"
    >
      <option
        v-for="option in options"
        :selected="option === value"
        :key="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFieldMixin";

export default {
  name: "BaseSelect",
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    }
  },
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
