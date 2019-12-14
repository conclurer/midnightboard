<template>
  <div class="home">
    <Header v-on:add-note="addNote"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue';

export default {
  name: 'Demo',
  components: {
    Header
  },
  data() {
    return {
      notes: [
      ]
    }
  },
  methods: {
    addNote(newNote) {
      this.notes = [...this.notes, newNote];
    }
  }
}
</script>
