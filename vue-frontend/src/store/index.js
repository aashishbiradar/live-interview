import { createStore } from 'vuex';
import VuexPersist from 'vuex-persist';
import { find, remove, pick } from 'lodash';

const vuexLocal = new VuexPersist({
  storage: window.localStorage
});

export default createStore({
  state() {
    return {
      displayQuestion: [],
      questions: [],
    };
  },
  mutations: {
    addQuestion (state, question) {
      state.questions.push(question);
    },
    removeQuestion (state, qId) {
      remove(state.questions, { id: qId });
    },
    showQuestion (state, qId) {
      const question = find(state.questions, { id: qId});
      state.displayQuestion.push(pick(question, ['id', 'text']));
    },
  },
  actions: {
    // TODO call api to store in DB
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
