<template>
  <v-dialog
    :value="GET_WARN_DIALOG"
    max-width="290"
    persistent
  >
    <v-card>
      <v-toolbar
          color="yellow darken-1"
      >Warning</v-toolbar>

      <v-card-text>
        <div class="pt-5">The request is not supported</div>
<!--        <div v-text="GET_WARN_MESSAGE"></div>-->
      </v-card-text>

      <v-card-actions>
        <v-spacer/>
        <slot name="footer">
        </slot>
        <v-btn @click="CHANGE_WARN_DIALOG()">
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
      GET_WARN_DIALOG: 'commonDialog/GET_WARN_DIALOG',
      GET_WARN_MESSAGE: 'commonDialog/GET_WARN_MESSAGE',
    }),
  },
  methods: {
    ...mapMutations({
      CHANGE_WARN_DIALOG: 'commonDialog/CHANGE_WARN_DIALOG',
    }),
  },
}
</script>

<style scoped>

</style>
