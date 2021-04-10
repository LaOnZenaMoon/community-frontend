<template>
  <v-dialog
    :value="getWarnDialog"
    max-width="290"
    persistent
  >
    <v-card>
      <v-toolbar
          color="yellow darken-1"
      >Warning</v-toolbar>

      <v-card-text>
        <div class="pt-5">The request is not supported</div>
<!--        <div v-text="getWarnMessage"></div>-->
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <slot name="footer">
        </slot>
        <v-btn @click="changeWarnDialog()">
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
      getWarnDialog: 'commonDialog/getWarnDialog',
      getWarnMessage: 'commonDialog/getWarnMessage',
    }),
  },
  methods: {
    ...mapMutations({
      changeWarnDialog: 'commonDialog/changeWarnDialog',
    }),
  },
}
</script>

<style scoped>

</style>
