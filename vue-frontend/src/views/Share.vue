<template>
  <navbar/>
  <div v-if="question" class="question">{{question}}</div>
  <div class="share-view">
    <textarea id="codearea"></textarea>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue'

// socket
import io from 'socket.io-client';

//codemirror
import codemirror from 'codemirror';

// base style
import 'codemirror/lib/codemirror.css'
// theme css
import 'codemirror/theme/base16-dark.css'
// language
import 'codemirror/mode/vue/vue.js'
// active-line.js
import 'codemirror/addon/selection/active-line.js'
// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/match-highlighter.js'
// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'
// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'

export default {
  name: 'Share',
  components: { Navbar },
  setup() {
    const options = {
      tabSize: 4,
      foldGutter: true,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      keyMap: "sublime",
      mode: 'text/x-vue',
      theme: 'base16-dark',
      extraKeys: {
        'F11'(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"))
        },
        'Esc'(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
        }
      }
    };
    const store = useStore();
    const route = useRoute();
    const { shareId } = route.params;
    let socket;
    let editor;

    // data
    const code = ref('');
    const question = ref('');

    // computed
    const displayQuesiton = computed(() => store.state.displayQuestion);

    // socket
    if (window.location.origin === 'http://localhost:8080') {
      socket = io('http://localhost:3000');
    } else {
      socket = io();
    }

    // connect
    socket.on('connect', () => {
      socket.emit('join', { shareId });
      showQuestion();
    });

    // disconnect
    socket.on('disconnect', () => {
      // alert('Your are disconnected! Please check your network and retry!');
    });

    // newUser
    socket.on('newUser', (socketId) => {
      showQuestion();
      if (code.value === '') return;
      socket.emit('codeChange', {
        socketId,
        payload: code.value
      });
    });

    // codeChange
    socket.on('codeChange', (newContent) => {
      if (newContent === code.value) return;
      code.value = newContent;
      var cursor = editor.getCursor();
      editor.setValue(code.value);
      editor.setCursor(cursor);
    });

    // new question
    socket.on('newQuestion', q => question.value = q);

    // methods
    const codeChange = (newCode) => {
      if (newCode === code.value) return;
      code.value = newCode;
      const params = {
        shareId,
        payload: code.value,
      };
      socket.emit('codeChange', params);
    };

    const showQuestion = () => {
      if (displayQuesiton.value && displayQuesiton.value) {
        question.value = displayQuesiton.value,
        socket.emit('showQuestion', { shareId, question: question.value });
      }
    };

    // mounted
    onMounted(() => {
      editor = codemirror.fromTextArea(document.getElementById('codearea'), options);
      editor.on('change', () => {
        const newCode = editor.getValue();
        codeChange(newCode);
      });
    });

    return { code, question, displayQuesiton, codeChange };
  },
};
</script>

<style scoped>
  div >>> .cm-s-base16-dark.CodeMirror {
    height: calc(100vh - 30px);
  }
  .question{
    padding: 25px;
    background: #151515;
    color: #fff;
    font-weight: bold;
  }
</style>