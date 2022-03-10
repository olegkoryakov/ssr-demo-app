<template>
  <div
    class="input"
  >
    <label
      :for="id"
      class="input__label"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      type="text"
      :value="value"
      class="input__field"
      @change="onInputChange"
    >
  </div>
</template>

<script lang="ts">
import './style.css'
import Vue from 'vue'

export default Vue.extend({
  name: 'InputComponent',
  props: {
    value: {
      type: String,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: undefined
    },
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    onInputChange (evt: InputEvent) {
      const input = evt.target as HTMLInputElement
      this.onChange(input.value)
    }
  }
})
</script>
