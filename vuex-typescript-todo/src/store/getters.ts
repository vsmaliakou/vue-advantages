import { State } from "@/store/state";
import { GetterTree } from "vuex";

export type Getters = {
  completedCount(state: State): number;
  totalCount(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  completedCount(state) {
    return state.items.filter((i) => i.completed).length;
  },
  totalCount(state) {
    return state.items.length;
  },
};
