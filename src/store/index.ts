import Vue from 'vue'
import Vuex from 'vuex'
import userModule, { UserState } from './UserModule'
export interface State {
  user: UserState;
}

export default new Vuex.Store<State>({
  modules: {
    user: userModule
  }
})