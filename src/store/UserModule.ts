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
    login: function(state: UserState, user: User): void {
      state.user = user;
    },
    logout: function(state: UserState): void {
      console.log("mutations logout", state.user);
      
      state.user = {
        id: 0,
        email: "",
        password_md5: "",
        name: "",
        logged: false,
      };
    }
  },

  actions: {
    setUser: function(context: any, user: User): void {
      context.commit("setUser", user);
    },
    login: function(context: any, user: User): void {
      context.commit("setUser", user);
    },
    logout: function(context: any): void {
      context.commit("logout");
    }
  },

  getters: {
    user: function(state: UserState): User | null {
      return state.user;
    },
    isLoggedIn: function(state: UserState): boolean {
      return state.user !== null && state.user.logged;
    },
  }
}