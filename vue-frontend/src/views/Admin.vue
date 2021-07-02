<template>
  <div class="admin">
    
    <div v-if="displayQuesiton && displayQuesiton[0]">
      <p>Question Displayed:</p>
      <div class="question-card">
        <p>{{displayQuesiton[0].text}}</p>
      </div>
    </div>
    <div>
      <p>Add Question:</p>
      <textarea
        v-model="questionText"
        name="question"
        cols="100"
        rows="10">
      </textarea>
      <div>
        <button @click="addQuestion" class="add-btn btn primary">
          Add Question
        </button>
      </div>
    </div>
    <div v-if="questions && questions[0]">
      <p>All Questions:</p>
      <div v-for="(q, index) in questions" :key="q.id" class="question-card">
        <div>{{index+1}}) {{q.text}}</div>
        <div class="actions">
          <button @click="showQuestion(q.id)" class="btn primary">Show</button>
          <button @click="removeQuestion(q.id)" class="btn secondary">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { nanoid } from 'nanoid';

export default {
  name: 'Admin',
  setup() {
    const store = useStore();
    // data
    const questionText = ref('');
    // computed
    // const questions = computed(() => store.state.questions);
    // const displayQuesiton = computed(() => store.state.displayQuesiton);
    // methods
    const addQuestion = () => {
      const question = {
        id: nanoid(5),
        text: questionText.value,
      };
      store.dispatch('addQuestion', question);
      questionText.value = '';
    };
    const removeQuestion = (qId) => {
      store.dispatch('removeQuestion', qId);
    };
    const showQuestion = (qId) => {
      store.dispatch('showQuestion', qId);
    };
    return {
      questionText,
      questions: computed(() => store.state.questions),
      displayQuesiton: computed(() => store.state.displayQuestion),
      addQuestion,
      removeQuestion,
      showQuestion
    };
  },
}
</script>

<style scoped>
.admin {
  margin: 0 5%;
}
.add-btn {
  margin: 15px 0;
}
.question-card {
  margin-bottom: 20px;
  padding: 15px 10px 0 10px;
  border: 2px solid;
}
.actions .btn {
  margin: 15px 15px 10px 0;
}
</style>
