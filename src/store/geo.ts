import { API } from "@/api";
import {
  Getters,
  Actions,
  Mutations,
  GeoMutation,
  ICountry,
  IState,
  ICity,
  IGeoModule,
} from "@/models";
import { path } from "@/config";

const state: IGeoModule = {
  countries: [],
  states: [],
  cities: [],
};

const getters: Getters<IGeoModule> = {
  allCountries: (s) => s.countries,
  allStates: (s) => s.states,
  allCities: (s) => s.cities,
  findCountry: (s) => (id: string) => {
    // tslint:disable-next-line: triple-equals
    return s.countries.find((c: ICountry) => c.id == id);
  },
  findState: (s) => (id: string) => {
    return s.states.find((s: IState) => s.id === id);
  },
  findCities: (s) => (id: string) => {
    return s.cities.find((c: ICity) => c.id === id);
  },
  matchStates: (s) => (selectedCountryId: string) =>
    s.states.filter(
      (state: IState) => state.country_id === "" + selectedCountryId,
    ),
  matchCities: (s) => (selectedStateId: string) =>
    s.cities.filter((city: ICity) => city.state_id === selectedStateId),
};

const actions: Actions<IGeoModule> = {
  async fetchCountries({ commit }) {
    const data = await API.get(path.countries());
    commit(GeoMutation.SET_COUNTRIES, data);
  },
  async fetchStates({ commit }) {
    const data = await API.get(path.states());
    commit(GeoMutation.SET_STATES, data);
  },
  async fetchCities({ commit }) {
    const data = await API.get(path.cities());
    commit(GeoMutation.SET_CITIES, data);
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
