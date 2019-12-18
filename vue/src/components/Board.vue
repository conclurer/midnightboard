<template>
    <div class="board">
        <img src="../assets/background.jpg" id="bg">

        <div v-bind:key="note.id" v-for="note in notes">
            <Note v-bind:note="note" style="position: absolute; top: 110px; left: 20px; width: 200px; height: 300px;}" />
        </div>

        <div v-if="newNote.active">
            <NewNote v-if="newNote.active" v-on:add-note="addNote" style="position: absolute; top: 300px; left: 670px; width: 200px; height: 300px;}" />
        </div>
    </div>
</template>

<script>
import Note from '@/components/Note.vue';
import NewNote from '@/components/NewNote.vue';

export default {
    name: "Board",
    components: {
        Note,
        NewNote
    },
    props: ["notes", "newNote"],
    methods: {
        addNote(newNote) {
            //Send up to parent
            this.$emit('add-note', newNote);
        }
    }
}
</script>

<style scoped>
    #bg {
        position: fixed; 
        top: 80; 
        left: 0; 
        min-width: 100%;
        min-height: 100%;
    }
</style>