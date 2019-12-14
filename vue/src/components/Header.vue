<template>
    <header class="header" style="height: 75px;">
        <table width="100%">
            <tr>
                <td width="33%">
                    <router-link to="/">
                        <img
                        alt="Conclurer logo"
                        src="../assets/logo.png"
                        width="35%"
                        align="left"
                        style="padding-left: 10px">
                    </router-link>
                </td>
                <td width="33%">
                    <h1 align="center">IT department</h1>
                </td>
                <td width="33%">
                    <div v-on:click="addNote">
                        <img
                        alt="add-button"
                        src="../assets/newNote.png"
                        width="7%"
                        align="right"
                        style="padding-right: 10px">
                    </div>
                </td>
            </tr>
        </table>
    </header>
</template>

<script>
import uuid from 'uuid';
export default {
    name: "Header",
    methods: {
        addNote() {
            const newNote = {
                id: uuid.v4(),
            }

            //Send up to parent
            this.$emit('add-note', newNote);
        }
    }
}
</script>

<style scoped>
    .header {
        background: #333;
        color: #fff;
        text-align: center;   
    }
</style>