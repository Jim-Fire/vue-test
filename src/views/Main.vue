<template>
  <v-container fluid grid-list-md>
    <v-data-iterator :items="findCurrentUser()" content-tag="v-layout" hide-actions row wrap mb-30>
      <template v-slot:item="props">
        <v-flex xs12 sm6 md4 lg3>
          <v-card>
            <v-card-title>
              <h4>Hello, {{ props.item.name }}</h4>
            </v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Email:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.email }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Phone Number:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.phone_number }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="props.item.address">
                <v-list-tile-content>Address:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.address }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-if="props.item.about_me">
                <v-list-tile-content>About me:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.about_me }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Country:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.country }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>State:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.state }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>City:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.city }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Created At:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.createdAt }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>

    <v-card class="users-card">
      <v-card-title>
        Users
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="mapAllUsers(allUsers)"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.email }}</td>
          <td class="text-xs-right">{{ props.item.phone_number }}</td>
          <td class="text-xs-right">{{ props.item.address }}</td>
          <td class="text-xs-right">{{ props.item.about_me }}</td>
          <td class="text-xs-right">{{ props.item.country }}</td>
          <td class="text-xs-right">{{ props.item.state }}</td>
          <td class="text-xs-right">{{ props.item.city }}</td>
          <td class="text-xs-right">{{ props.item.createdAt }}</td>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapActions, mapGetters } from "vuex";
import { IUser } from '../models';

@Component({
  computed: {
    ...mapGetters([
      "allUsers",
      "findCountry",
      "findState",
      "findCities",
      "getCurrentUser"
    ])
  },
  methods: {
    transformUser(user: IUser) {
      return {
        ...user,
        country: this.findCountry(user.country_id).name,
        state: this.findState(user.state_id).name,
        city: this.findCities(user.city_id).name,
        createdAt: new Date(user.createdAt!).toLocaleString()
      };
    },
    mapAllUsers(users: IUser[]) {
      return users.map(this.transformUser);
    },
    findCurrentUser() {
      const user: IUser = this.getCurrentUser();
      
      return user ?  [this.transformUser(user)]: [];
    }
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          align: "center",
          value: "name"
        },
        { text: "Email", value: "email", align: "center" },
        { text: "Phone Number", value: "phone_number", align: "center" },
        { text: "Address", value: "address", align: "center" },
        { text: "About", value: "about_me", align: "center" },
        { text: "Country", value: "country", align: "center" },
        { text: "State", value: "state", align: "center" },
        { text: "City", value: "city", align: "center" },
        { text: "Created At", value: "createdAt", align: "center" }
      ]
    };
  }
})
export default class Main extends Vue {}
</script>

<style lang="scss">
.elevation-1 table {
  margin: auto;
}
.users-card {
  margin-top: 30px;
}
</style>