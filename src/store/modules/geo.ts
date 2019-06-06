import axios from 'axios';
import {
  GeoGetters,
  GeoActions,
  GeoMutations,
  GeoMutation,
  ICountry,
  IState,
  ICity,
  IGeoModule,
} from 'src/models';
import { path } from 'src/config';

const state: IGeoModule = {
  countries: [],
  states: [],
  cities: [],
};

const getters: GeoGetters = {
  allCountries: (s) => s.countries,
  allStates: (s) => s.states,
  allCities: (s) => s.cities,
};

const actions: GeoActions = {
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

const mutations: GeoMutations = {
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
