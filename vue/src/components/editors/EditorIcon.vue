<!-- This class is used to draw the icons under the text note editor -->
<template>
  <div
    class="icon"
    :class="[`icon--${name}`, `icon--${size}`, { 'has-align-fix': fixAlign }]"
  >
    <font-awesome-icon :icon="name" />
  </div>
</template>

<script>
export default {
  props: {
    name: {},
    size: {
      default: 'normal'
    },
    modifier: {
      default: null
    },
    fixAlign: {
      default: true
    }
  }
}
</script>
