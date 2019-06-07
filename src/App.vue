<template>
  <v-app id="app">
    <div id="nav">
      <v-toolbar>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat>
            <router-link to="/">Home</router-link>
          </v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-if="currentUserId !== undefined">
            <router-link to="/main">Main</router-link>
          </v-btn>
          <v-btn flat v-if="currentUserId !== undefined" @click="handleLogOut">Logout</v-btn>
          <v-btn flat v-if="currentUserId === undefined">
            <router-link to="/login">Login</router-link>
          </v-btn>
          <v-btn flat v-if="currentUserId === undefined">
            <router-link to="/register">Register</router-link>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import Router from "vue-router";

@Component({
  computed: {
    ...mapGetters(["currentUserId"])
  },
  methods: {
    ...mapActions([
      "fetchUsers",
      "fetchCountries",
      "fetchStates",
      "fetchCities",
      "logOut"
    ]),
    handleLogOut() {
      this.logOut();
      this.$router.push("login");
    }
  }
})
export default class Home extends Vue {
  created() {
    this.fetchUsers();
    this.fetchCountries();
    this.fetchStates();
    this.fetchCities();
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding-bottom: 30px;
  a,
  button {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: underline;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
