import axios from 'axios';
import {
  IUserModule,
  IUser,
  UserGetters,
  UserActions,
  UserMutations,
  UserMutation,
} from 'src/models';
import { path } from 'src/config';

const state: IUserModule = {
  users: [],
  currentId: undefined,
};

const getters: UserGetters = {
  allUsers: (s) => s.users,
  getUserByEmail: (s) => (email: string) => {
    return s.users.find((user: IUser) => user.email === email);
  },
  getCurrentUser: (s) => () => {
    return s.users.find((user: IUser) => user.id === s.currentId);
  },
};

const actions: UserActions = {
  async registerUser({ commit }, user: IUser) {
    const response = await axios.post(path.base() + path.users(), { ...user });
    commit(UserMutation.NEW_USER, response.data);
  },
  async logIn({ commit, getters, state }, email: string) {
    const user: IUser | undefined = getters.getUserByEmail(email);

    if (state.currentId !== undefined) {
      commit(UserMutation.LOG_IN, user!.id);
    }
  },
};

const mutations: UserMutations = {
  [UserMutation.NEW_USER]: (s, user: IUser) => s.users.unshift(user),
  [UserMutation.LOG_IN]: (s, userId: string) => (s.currentId = userId),
  [UserMutation.LOG_OUT]: (s) => (s.currentId = undefined),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
