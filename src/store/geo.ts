import axios from 'axios';
import {
  Getters,
  Actions,
  Mutations,
  GeoMutation,
  ICountry,
  IState,
  ICity,
  IGeoModule,
} from '@/models';
import { path } from '@/config';

const state: IGeoModule = {
  countries: [],
  states: [],
  cities: [],
};

const getters: Getters<IGeoModule> = {
  allCountries: (s) => s.countries,
  allStates: (s) => s.states,
  allCities: (s) => s.cities,
};

const actions: Actions<IGeoModule> = {
  async fetchCountries({ commit }) {
    const response = await axios.get(path.base() + path.countries());
    commit(GeoMutation.SET_COUNTRIES, response.data);
  },
  async fetchStates({ commit }) {
    const response = await axios.get(path.base() + path.states());
    commit(GeoMutation.SET_STATES, response.data);
  },
  async fetchCities({ commit }) {
    const response = await axios.get(path.base() + path.cities());
    commit(GeoMutation.SET_CITIES, response.data);
  },
};

const mutations: Mutations<IGeoModule> = {
  [GeoMutation.SET_COUNTRIES]: (s, countries: ICountry[]) =>
    (s.countries = countries),
  [GeoMutation.SET_STATES]: (s, states: IState[]) => (s.states = states),
  [GeoMutation.SET_CITIES]: (s, cities: ICity[]) => (s.cities = cities),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
