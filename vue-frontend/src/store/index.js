import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import { remove } from 'lodash';

const vuexLocal = new VuexPersist({
  storage: window.localStorage
});

export default createStore({
  state: {
    questions: [],
    displayQuestion: [],
  },
  mutations: {
    addQuestion (state, question) {
      state.questions.push(question);
    },
    removeQuestion (state, qId) {
      remove(state.questions, { id: qId });
    },
    showQuestion (state, qId) {
      state.displayQuestion.push(qId);
    },
  },
  actions: {
    addQuestion({ commit }, question) {
      commit('addQuestion', question);
    },
    removeQuestion({ commit }, qId) {
      commit('removeQuestion', qId);
    },
    showQuestion({ commit }, qId) {
      commit('showQuestion', qId);
    },
  },
  plugins: [vuexLocal.plugin],
  modules: {
  }
})
