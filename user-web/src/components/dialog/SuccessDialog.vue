<template>
  <v-dialog
    :value="GET_SUCCESS_DIALOG"
    max-width="290"
    persistent
  >
    <v-card>
      <v-toolbar
          color="primary"
          dark
      >Success</v-toolbar>

      <v-card-text>
        <div class="pt-5">The request is finished Successfully.</div>
        <div v-text="GET_SUCCESS_MESSAGE"></div>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <slot name="footer">
        </slot>
        <v-btn @click="CHANGE_SUCCESS_DIALOG('')">
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
      GET_SUCCESS_DIALOG: 'commonDialog/GET_SUCCESS_DIALOG',
      GET_SUCCESS_MESSAGE: 'commonDialog/GET_SUCCESS_MESSAGE',
    }),
  },
  methods: {
    ...mapMutations({
      CHANGE_SUCCESS_DIALOG: 'commonDialog/CHANGE_SUCCESS_DIALOG',
    }),
  },
}
</script>

<style scoped>

</style>
