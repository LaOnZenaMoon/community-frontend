<template>
  <v-navigation-drawer
      :value="getLeftDrawer"
      app
      width="250"
      color="#2f4050"
  >
    <v-sheet
        height="100"
        width="100%"
        align="center"
        class="logo-style"
    >
      <h3>User Web</h3>
      <h4>LaOnZenaMoon</h4>
      <!--      <h4 v-text="getUserName()"></h4>-->
    </v-sheet>

    <v-list>

      <v-list-group
        :value="false"
      >
        <template v-slot:prependIcon>
          <font-awesome-icon :icon="['fas', 'project-diagram']"></font-awesome-icon>
        </template>
        <template v-slot:activator>
          <v-list-item-title>Graph</v-list-item-title>
        </template>

        <v-list-item to="#">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sample</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

      <v-list-group
          :value="false"
      >
        <template v-slot:prependIcon>
          <font-awesome-icon :icon="['fas', 'cogs']"></font-awesome-icon>
        </template>
        <template v-slot:activator>
          <v-list-item-title>Settings</v-list-item-title>
        </template>

        <v-list-item to="#">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sample</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
import {mapGetters} from 'vuex'
import {getUserName} from "@/api/token-control";
import {movePage} from "@/api/api-control";

export default {
  computed: {
    ...mapGetters({
      getLeftDrawer: 'sidebar/getLeftDrawer',
    }),
  },
  methods: {
    getUserName() {
      return getUserName();
    },
    movePage,
  },
}
</script>

<style scoped>


</style>
