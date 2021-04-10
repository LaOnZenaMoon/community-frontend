<template>
  <v-dialog
    :value="getFailDialog"
    max-width="290"
    persistent
  >
    <v-card>
      <v-toolbar
          color="red"
          dark
      >Fail</v-toolbar>

      <v-card-text>
        <div class="pt-5">The request is failed.</div>
        <div v-text="getFailMessage">Unknown error has occurred.</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <slot name="footer">
        </slot>
        <v-btn @click="changeFailDialog('')">
          <font-awesome-icon :icon="['fas', 'window-close']"></font-awesome-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
  computed: {
    ...mapGetters({
      getFailDialog: 'commonDialog/getFailDialog',
      getFailMessage: 'commonDialog/getFailMessage',
    }),
  },
  methods: {
    ...mapMutations({
      changeFailDialog: 'commonDialog/changeFailDialog',
    }),
  },
}
</script>

<style scoped>

</style>
