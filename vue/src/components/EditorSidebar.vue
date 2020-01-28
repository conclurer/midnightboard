<template>
  <div class="editorSidebar">
    <div class="gap">
    </div>
    <NoteEditor />
  </div>
</template>

<script>
import NoteEditor from '@/components/NoteEditor.vue';

export default {
  components: {
    NoteEditor
  }
}
</script>

<style scoped>
    .gap {
        position: relative;
        top: 0px;
        left: 0px;
        height: 100px;
        width: 100%;
    }
</style>