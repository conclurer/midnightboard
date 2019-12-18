<template>
    <div class="noteBody">
        {{note.text}}
    </div>
</template>

<script>
export default {
    name: "NoteBody",
    props: ["note"]
}
</script>

<style scoped>
    .noteBody {
        height: 270px;
        background: #fff2ab;
        color: #000;
        text-align: center;
        display : flex;
        align-items : center;
        justify-content: center;
    }
</style>