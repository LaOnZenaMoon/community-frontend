<template>
  <v-dialog
      v-model="isOpen"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
      persistent
  >
    <v-card tile>
      <v-toolbar
          flat
          dark
      >
        <v-btn
            fab
            x-small
            @click="close()"
        >
          <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>

        <slot name="header">
          <v-btn
              fab
              x-small
              @click="close()"
          >
            <font-awesome-icon :icon="['fas', 'save']"></font-awesome-icon>
          </v-btn>
        </slot>
      </v-toolbar>
      <slot name="body"></slot>
      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'isOpen',
  ],
  methods: {
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style scoped>

</style>
