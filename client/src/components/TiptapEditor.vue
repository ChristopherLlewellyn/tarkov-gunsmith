<template>
  <v-container>
    <tiptap-vuetify 
      v-model="content" 
      :extensions="extensions"
      :disabled="disabled"
      :toolbar-attributes="{ color: 'grey-darken' }" 
      :card-props="{ outlined: true }"
    />
  </v-container>
</template>

<script>
  // import the component and the necessary extensions
  import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History
  } from 'tiptap-vuetify'

  export default {
    props: {
      disabled: Boolean,
      data: String
    },
    // specify TiptapVuetify component in "components"
    components: {
      TiptapVuetify
    },
    mounted() {
      this.content = this.data;
    },
    data: () => ({
      // declare extensions you want to use
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [Heading, {
          options: {
            levels: [1, 2, 3]
          }
        }],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak
      ],
      // starting editor's content
      content: `<p>Write something here...</p>`
    }),
    watch: {
      content(newValue) {
        this.$emit('update-description', newValue)
      },
      data(newValue) {
        this.content = newValue
      }
    }
  }

</script>
