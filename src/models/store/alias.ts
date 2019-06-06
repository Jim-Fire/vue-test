import { IRootState, IUserModule, IGeoModule } from 'src/models';
import { GetterTree, ActionTree, MutationTree } from 'vuex';

export type UserGetters = GetterTree<IUserModule, IRootState>;
export type UserActions = ActionTree<IUserModule, IRootState>;
export type UserMutations = MutationTree<IUserModule>;

export type GeoGetters = GetterTree<IGeoModule, IRootState>;
export type GeoActions = ActionTree<IGeoModule, IRootState>;
export type GeoMutations = MutationTree<IGeoModule>;
