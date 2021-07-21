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
              @click="close()"
          >
            <font-awesome-icon :icon="['fas', 'save']"></font-awesome-icon>
          </v-btn>
        </slot>
      </v-toolbar>
      <v-card-text class="pa-5">
        <template v-if="commonInformation">
          <v-row>
            <v-col>
              <v-text-field
                  label="Created User ID"
                  disabled
                  v-model="createdUserIdentifier"
              />
            </v-col>
            <v-col>
              <v-text-field
                  label="Created At"
                  disabled
                  v-model="createdDateTime"
              />
            </v-col>
          </v-row>
        </template>
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
    close() {
      this.$emit('close');
    },
  },
}
</script>

<style scoped>

</style>
