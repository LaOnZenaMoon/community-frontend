<template>
  <v-dialog
    :value="getSuccessDialog"
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
        <div v-text="getSuccessMessage"></div>
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <slot name="footer">
        </slot>
        <v-btn @click="changeSuccessDialog('')">
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
      getSuccessDialog: 'commonDialog/getSuccessDialog',
      getSuccessMessage: 'commonDialog/getSuccessMessage',
    }),
  },
  methods: {
    ...mapMutations({
      changeSuccessDialog: 'commonDialog/changeSuccessDialog',
    }),
  },
}
</script>

<style scoped>

</style>
