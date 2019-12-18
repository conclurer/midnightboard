<template>
    <header class="header">
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
                    <h1 align="center">Quality Assurance</h1>
                </td>
                <td width="33%">
                    <div v-on:click="newNote">
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
        newNote() {
            //Send up to parent
            this.$emit('new-note', true);
        }
    }
}
</script>

<style scoped>
    .header {
        height: 80px;
        color: #fff;
        text-align: center;
    }
</style>