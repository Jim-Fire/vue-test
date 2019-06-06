import { IRootState } from 'src/models';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

export type Getters<M> = GetterTree<M, IRootState>;
export type Actions<M> = ActionTree<M, IRootState>;
export type Mutations<M> = MutationTree<M>;
