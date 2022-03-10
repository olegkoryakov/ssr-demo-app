<template>
  <div
    :class="`checkbox ${lineThrough ? 'checkbox--line-through' : ''}`"
  >
    <input
      :id="id"
      type="checkbox"
      class="checkbox__input visually-hidden"
      :checked="isChecked"
      @change="onChange"
    >
    <label
      :for="id"
      class="checkbox__label"
    >
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import './style.css'

export default Vue.extend({
  name: 'CheckboxComponent',
  props: {
    isChecked: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    lineThrough: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    onChange: {
      type: Function,
      required: true
    }
  }
})
</script>

<style>

</style>
