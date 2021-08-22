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
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>

        <slot name="header">
          <v-btn
              fab
              x-small
              @click="save()"
          >
            <font-awesome-icon :icon="['fas', 'save']"></font-awesome-icon>
          </v-btn>
        </slot>
      </v-toolbar>
      <v-card-text class="pa-5">
        <slot name="body"></slot>
      </v-card-text>
      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'isOpen',
    'title',
    'commonInformation',
    'createdUserIdentifier',
    'createdDateTime',
  ],
  methods: {
    save() {
      this.$emit('save');
    },
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style scoped>

</style>
