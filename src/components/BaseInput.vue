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
export default {
  name: "BaseInput.vue",
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ""
    },
    value: [String, Number],
    inputClass: [String]
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      };
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("input", event.target.value);
    }
  }
};
</script>

<style scoped></style>
