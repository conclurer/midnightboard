<template>
  <div class="editor">
    <br>
    <h2>
      <input
        type="text"
        class="editor__title"
        name="title"
        v-model="titleContent"
        maxlength="25"
        autocomplete="off"
      >
    </h2>
    <hr>
    <editor-content
      class="editor__content"
      :editor="contentEditor"
    />
    <div class="lowerGap" />

    <!-- Formatting tools -->
    <editor-menu-bar
      v-slot="{ commands, isActive }"
      :editor="contentEditor"
    >
      <div class="menubar">
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strikethrough" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <b>H1</b>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 4 }) }"
          @click="commands.heading({ level: 4 })"
        >
          <b>H2</b>
        </button>
        <br>
        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="list-ul" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="list-ol" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote-right" />
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <icon name="terminal" />
        </button>

        <button
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <b>—</b>
        </button>

        <button
          class="menubar__button"
          @click="commands.undo"
        >
          <icon name="undo" />
        </button>

        <button
          class="menubar__button"
          @click="commands.redo"
        >
          <icon name="redo" />
        </button>
      </div>
    </editor-menu-bar>
    <br>
    <b-button
      class="button"
      @click="$emit('create-note', titleContent, textContent)"
    >
      {{$t('editor.note.create')}}
    </b-button>
    <br><br>
  </div>
</template>

<script>
import Icon from '@/components/EditorIcon.vue'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    Icon
  },
  data () {
    return {
      titleContent: this.$t('editor.note.title'),
      textContent: this.$t('editor.note.content'),
      contentEditor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [3, 4] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: this.$t('editor.note.content'),
        onUpdate: ({ getHTML }) => {
          this.textContent = getHTML()
          this.textContent = this.textContent.replace('Ä', '&Auml;')
          this.textContent = this.textContent.replace('ä', '&auml;')
          this.textContent = this.textContent.replace('Ö', '&Ouml;')
          this.textContent = this.textContent.replace('ö', '&ouml;')
          this.textContent = this.textContent.replace('Ü', '&Uuml;')
          this.textContent = this.textContent.replace('ü', '&uuml;')
          this.textContent = this.textContent.replace('ß', '&szlig;')
        }
      })
    }
  },
  beforeDestroy () {
    this.contentEditor.destroy()
  }
}
</script>

<style scoped>
  button {
    width: 43px;
  }

  .editor {
    margin-left: 12px;
    margin-right: 12px;
  }

  .editor__title {
    width: 480px;
    text-align: center;
    border: 1px solid #4d90fe;
    border-radius: 3px;
    outline: none;
  }

  .button {
    width: auto;
  }
</style>
