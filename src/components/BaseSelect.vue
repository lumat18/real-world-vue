<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select :value="value" @input="updateValue" v-bind="$attrs">
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
export default {
  name: "BaseSelect",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      required: true
    },
    value: [String]
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped></style>
