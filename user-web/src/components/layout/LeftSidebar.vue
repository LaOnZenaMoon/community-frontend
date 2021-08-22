<template>
  <v-navigation-drawer
      :value="GET_LEFT_DRAWER"
      app
      width="250"
  >
    <v-sheet
        height="100"
        width="100%"
        align="center"
        class="logo-style"
    >
      <h3>LaOnZenaMoon Web</h3>
      <h4 v-text="getUserName()"></h4>
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

      <v-list-item to="/user/management">
        <v-list-item-icon>
          <font-awesome-icon :icon="['fas', 'users']"></font-awesome-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>User</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-group
          :value="false"
      >
        <template v-slot:prependIcon>
          <font-awesome-icon :icon="['fas', 'cogs']"></font-awesome-icon>
        </template>
        <template v-slot:activator>
          <v-list-item-title>Settings</v-list-item-title>
        </template>

        <v-list-item to="/setting/user/role/management">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>User Role</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/setting/role/management">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Role</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/setting/role/resource/management">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Role Resource</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/setting/resource/management">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Resource</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/setting/role/hierarchy/management">
          <v-list-item-action></v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Role Hierarchy</v-list-item-title>
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
      GET_LEFT_DRAWER: 'sidebar/GET_LEFT_DRAWER',
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
