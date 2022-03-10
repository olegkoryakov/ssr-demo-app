<template>
  <button
    :type="type"
    :class="`button button--${theme}`"
    @click="onButtonClick"
  />
</template>

<script lang="ts">
import './style.css'
import Vue from 'vue'

export default Vue.extend({
  name: 'ButtonComponent',
  props: {
    action: {
      default: null,
      type: Function // ActionType = () => void;
    },
    type: {
      type: String, // TypeType = 'button' | 'submit';
      default: 'button'
    },
    theme: {
      type: String, // ThemeType = 'add' | 'remove';
      default: 'add'
    }
  },
  methods: {
    onButtonClick () {
      if (typeof this.action === 'function') {
        this.action()
      }
    }
  }
})
</script>
