<template>
  <div class="note">
    <NoteHeader :note="note" />
    <NoteBody :note="note" />
  </div>
</template>

<script>
import NoteHeader from '@/components/NoteHeader.vue'
import NoteBody from '@/components/NoteBody.vue'

export default {
  name: 'Note',
  components: {
    NoteHeader,
    NoteBody
  },
  props: ['note']
}
</script>

<style scoped>
    .note {
        z-index: 1;
    }
</style>
