<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="42" :rules="nameRules" label="Name" required></v-text-field>

    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required type="email"></v-text-field>

    <v-select
      v-model="selectCountry"
      :items="getCountries()"
      :rules="[v => !!v || 'Country is required']"
      label="Country"
      required
    ></v-select>

    <v-select
      v-if="selectCountry"
      v-model="selectState"
      :items="getStates()"
      :rules="[v => !!v || 'State is required']"
      label="State"
      required
    ></v-select>

    <v-select
      v-if="selectState"
      v-model="selectCity"
      :items="getCities()"
      :rules="[v => !!v || 'City is required']"
      label="City"
      required
    ></v-select>

    <v-text-field v-model="phone" :rules="phoneRules" label="Phone Number" required type="number"></v-text-field>

    <v-text-field v-model="address" label="Address"></v-text-field>

    <v-textarea
      v-model="about"
      label="A few words about yourself"
      :rules="aboutRules"
      :counter="500"
    ></v-textarea>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Just click it"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" @click="validate">Sign Up</v-btn>

    <v-btn color="error" @click="reset">Reset Form</v-btn>

    <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
  </v-form>
</template>

<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { ICountry, ICity, IState, IUser } from "@/models";

export default {
  computed: {
    ...mapGetters(["allCountries", "matchStates", "matchCities"])
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v: string) => !!v || "Name is required",
      (v: string) => (v && v.length <= 42) || "Name must be less than 42 characters",
      (v: string) => /[A-Za-z]/.test(v) || "Name should provide only letters"
    ],
    email: "",
    emailRules: [
      (v: string) => !!v || "E-mail is required",
      (v: string) => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    phone: "",
    phoneRules: [(v: string) => !!v || "Phone number is required"],
    address: "",
    about: "",
    aboutRules: [
      (v: string) => !(v && v.length > 500) || "Please enter less than 500 characters"
    ],
    selectCountry: undefined as ICountry | undefined,
    selectState: undefined as IState | undefined,
    selectCity: undefined as ICity | undefined,
    checkbox: false
  }),
  methods: {
    ...mapActions(["registerUser"]),
    getCountries() {
      return this.allCountries.map((country: ICountry) => ({
        ...country,
        toString() {
          return this.name;
        }
      }));
    },
    getStates() {
      return this.matchStates(this.selectCountry!.id).map((state: IState) => ({
        ...state,
        toString() {
          return this.name;
        }
      }));
    },
    getCities() {
      return this.matchCities(this.selectState!.id).map((city: ICity) => ({
        ...city,
        toString() {
          return this.name;
        }
      }));
    },
    validate() {
      if (this.$refs.form.validate()) {
        const newUser: IUser = {
          name: this.name,
          email: this.email,
          phone_number: this.phone,
          address: this.address,
          about_me: this.about,
          country_id: '' + this.selectCountry!.id,
          state_id: this.selectState!.id,
          city_id: this.selectCity!.id
        };
        this.registerUser(newUser);
        this.$router.push("login");
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
