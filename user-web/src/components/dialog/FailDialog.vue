<template>
  <v-dialog
    :value="GET_FAIL_DIALOG"
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
        <div v-text="GET_FAIL_MESSAGE">Unknown error has occurred.</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <slot name="footer">
        </slot>
        <v-btn @click="CHANGE_FAIL_DIALOG('')">
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
      GET_FAIL_DIALOG: 'commonDialog/GET_FAIL_DIALOG',
      GET_FAIL_MESSAGE: 'commonDialog/GET_FAIL_MESSAGE',
    }),
  },
  methods: {
    ...mapMutations({
      CHANGE_FAIL_DIALOG: 'commonDialog/CHANGE_FAIL_DIALOG',
    }),
  },
}
</script>

<style scoped>

</style>
