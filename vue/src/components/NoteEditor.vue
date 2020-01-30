<template>
  <div class="editor">
    <!-- Text fields -->
    <editor-content
      class="editor__title"
      :editor="titleEditor"
    />
    <hr>
    <editor-content
      class="editor__content"
      :editor="contentEditor"
    />
    <br>

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

    <div class="lowerGap" />

    <b-button
      class="button"
      @click="$emit('create-note', titleContent, textContent)"
    >
      Create
    </b-button>
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
      titleContent: 'Insert title here',
      textContent: '<p>Insert content here</p><ul><li>Start a bulleted list</li></ul><ol><li>Or start a numerical list</li></ol>',
      titleEditor: new Editor({
        extensions: [
          new Heading({ levels: [2] })
        ],
        content: `
          <h2>
            Insert title here
          </h2>
        `,
        onUpdate: ({ getHTML }) => {
          this.titleContent = getHTML()
          this.titleContent = this.titleContent.replace(/<[^>]*>?/gm, '')
        }
      }),
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
        content: `
          <p>
            Insert content here
          </p>
          <ul>
            <li>
              Start a bulleted list
            </li>
          </ul>
          <ol>
            <li>
              Or start a numerical list
            </li>
          </ol>
        `,
        onUpdate: ({ getHTML }) => {
          this.textContent = getHTML()
        }
      })
    }
  },
  beforeDestroy () {
    this.titleEditor.destroy()
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
  .lowerGap {
        position: relative;
        top: 0px;
        left: 0px;
        height: 35px;
        width: 100%;
  }
  .button {
        width: auto;
  }
</style>
