<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

    <v-btn :disabled="!valid" color="success" @click="validate">Log In</v-btn>

    <v-btn color="error" @click="reset">Reset Form</v-btn>

    <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
  </v-form>
</template>


<script lang="ts">
import { mapActions, mapGetters } from "vuex";
import { IUser } from "@/models";

export default {
  data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v: string) => !!v || "E-mail is required",
      (v: string) => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  computed: {
    ...mapGetters(["getUserByEmail","currentUserId"]),
  },
  methods: {
    ...mapActions(["logIn"]),
    validate() {
      if (this.$refs.form.validate()) {
        const user: IUser  = this.getUserByEmail(this.email);
        if (user && this.currentUserId === undefined) {
          this.logIn(user.id);
          this.$router.push("main");
        }
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
