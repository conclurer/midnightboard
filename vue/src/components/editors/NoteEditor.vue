<!-- This editor is used to create common text notes. It provides tools for text formatting -->
<template>
  <div class="editor">
    <b-form-input
      class="title-editor"
      name="title"
      v-model="titleContent"
      maxlength="25"
      autocomplete="off"
      :placeholder="$t('editor.note.title')"
      :state="titleState"
    />
    <b-form-invalid-feedback>
      {{$t('editor.tooShort')}}
    </b-form-invalid-feedback>
    <br>
    <editor-content
      class="content-editor"
      :editor="contentEditor"
    />
    <div class="lowerGap" />

    <!-- Formatting tools -->
    <editor-menu-bar
      v-slot="{ commands, isActive }"
      :editor="contentEditor"
    >
      <div class="menubar">
        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.bold() }"
          @click="commands.bold"
        >
          <icon name="bold" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.italic() }"
          @click="commands.italic"
        >
          <icon name="italic" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.underline() }"
          @click="commands.underline"
        >
          <icon name="underline" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.strike() }"
          @click="commands.strike"
        >
          <icon name="strikethrough" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.code() }"
          @click="commands.code"
        >
          <icon name="code" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <b>H1</b>
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.heading({ level: 4 }) }"
          @click="commands.heading({ level: 4 })"
        >
          <b>H2</b>
        </b-button>
        <br>
        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <icon name="list-ul" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <icon name="list-ol" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <icon name="quote-right" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          :class="{ 'active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <icon name="terminal" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          <b>—</b>
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          @click="commands.undo"
        >
          <icon name="undo" />
        </b-button>

        <b-button
          variant="secondary"
          class="menubar__button"
          @click="commands.redo"
        >
          <icon name="redo" />
        </b-button>
      </div>
    </editor-menu-bar>
    <br>
    <b-button
      variant="secondary"
      class="button"
      @click="$emit('create-note', titleContent, textContent)"
    >
      {{$t('editor.note.create')}}
    </b-button>
    <br><br>
  </div>
</template>

<script>
import Icon from '@/components/editors/EditorIcon.vue'
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
      titleContent: '',
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
        // When the user changes the text, it is saved in a suitable format
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
  // Computed value shows whether the title string is valid
  computed: {
    titleState () {
      return this.titleContent.length > 1
    }
  },
  // Called before the instance is destroyed
  beforeDestroy: function () {
    this.contentEditor.destroy()
  }
}
</script>

<style scoped>
  button {
    width: 43px;
  }

  .title-editor {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #4d90fe;
    border-radius: 3px;
  }

  .content-editor {
    width: 90%;
    margin-right: auto;
    margin-left: auto;
  }

  .menubar__button {
    margin: 1px;
  }

  .button {
    width: auto;
  }
</style>
