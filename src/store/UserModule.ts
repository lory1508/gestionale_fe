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
    login: function(state: UserState, user: User): void {
      user.logged = true;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: function(state: UserState): void {
      state.user = {
        id: 0,
        email: "",
        password_md5: "",
        name: "",
        logged: false,
      };
      localStorage.removeItem("user");
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
      return state.user !== null && state.user.logged || localStorage.getItem("user") !== null;
    },
  }
}