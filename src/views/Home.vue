<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <div class="users">
      <div
        @click="handleClick(user)"
        v-for="user in allUsers"
        :key="user.id"
        class="user-card"
        v-bind:class="{'is-complete':true}"
      >
        {{ user.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions, mapGetters } from "vuex";

@Component({
  components: {
    HelloWorld
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    handleClick($sourse){
      console.log($sourse)
    }
  },
  computed: {
    ...mapGetters(["allUsers"])
  }
})
export default class Home extends Vue {
  created() {
    this.fetchUsers();
  }
}
</script>
