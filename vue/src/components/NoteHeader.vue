<template>
  <div class="noteHeader">
    {{ note.title }}
  </div>
</template>

<script>
export default {
  name: 'NoteHeader',
  props: ['note']
};
</script>

<style scoped>
    .noteHeader {
        height: 30px;
        background: #ffeb81;
        color: #000;
        text-align: center;
        display : flex;
        align-items : center;
        justify-content: center;
    }
</style>
