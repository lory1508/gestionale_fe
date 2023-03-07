import { logout } from './../api/users';
import User from "@/types/user";

export interface UserState {
  user: User;
}

export default {
  namespaced: true,
  state: (): UserState => ({
    user: {
      id: 0,
      email: "",
      password_md5: "",
      name: "",
      logged: false,
    },
  }),

  mutations: {
    setUser: function(state: UserState, user: User): void {
      state.user = user;
    },
    setLoggedIn: function(state: UserState, loggedIn: boolean): void {
      if( loggedIn ) {
        state.user.logged = true;
      } else {
        state.user.logged = false;
      }
    },
    logout: function(state: UserState): void {
      logout().then(() => {
        state.user = {
          id: 0,
          email: "",
          password_md5: "",
          name: "",
          logged: false,
        };
      });
    }
  },

  actions: {
    setUser: function(context: any, user: User): void {
      context.commit("setUser", user);
    }
  },

  getters: {
    user: function(state: UserState): User | null {
      return state.user;
    },
    isLoggedIn: function(state: UserState): boolean {
      return state.user !== null;
    },
  }
}