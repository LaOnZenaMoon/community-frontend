<template>
  <v-navigation-drawer
      :value="getLeftDrawer"
      app
      width="250"
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
      <v-list-item to="/news/board">
        <v-list-item-icon>
          <font-awesome-icon :icon="['far', 'newspaper']"></font-awesome-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>News</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/magazine/board">
        <v-list-item-icon>
          <font-awesome-icon :icon="['fas', 'book']"></font-awesome-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Magazine</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/free-talk/board">
        <v-list-item-icon>
          <font-awesome-icon :icon="['far', 'comments']"></font-awesome-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Free-talk</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/multimedia/board">
        <v-list-item-icon>
          <font-awesome-icon :icon="['fas', 'photo-video']"></font-awesome-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Multimedia</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/market/board">
        <v-list-item-icon>
          <font-awesome-icon :icon="['fas', 'comment-dollar']"></font-awesome-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>Market</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

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
