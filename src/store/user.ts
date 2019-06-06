import axios from "axios";
import {
  IUserModule,
  IUser,
  Getters,
  Actions,
  Mutations,
  UserMutation,
} from "@/models";
import { path } from "@/config";

const state: IUserModule = {
  users: [],
  currentId: undefined,
};

const getters: Getters<IUserModule> = {
  allUsers: s => s.users,
  getUserByEmail: s => (email: string) => {
    return s.users.find((user: IUser) => user.email === email);
  },
  getCurrentUser: s => s.users.find((user: IUser) => user.id === s.currentId),
};

const actions: Actions<IUserModule> = {
  async fetchUsers({ commit }) {
    const response = await axios.get(path.base() + path.users());

    commit(UserMutation.SET_USERS, response.data);
  },
  async registerUser({ commit }, user: IUser) {
    const response = await axios.post(path.base() + path.users(), { ...user });

    commit(UserMutation.NEW_USER, response.data);
  },
  async logIn({ commit, getters, state }, email: string) {
    const user: IUser | undefined = getters.getUserByEmail(email);

    if (state.currentId === undefined) {
      commit(UserMutation.LOG_IN, user!.id);
    }
  },
  async logOut({ commit, state }) {

    if (state.currentId !== undefined) {
      commit(UserMutation.LOG_OUT);
    }
  },
};

const mutations: Mutations<IUserModule> = {
  [UserMutation.SET_USERS]: (s, users: IUser[]) => (s.users = users),
  [UserMutation.NEW_USER]: (s, user: IUser) => s.users.unshift(user),
  [UserMutation.LOG_IN]: (s, userId: string) => (s.currentId = userId),
  [UserMutation.LOG_OUT]: s => (s.currentId = undefined),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
