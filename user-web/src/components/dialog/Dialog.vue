<template>
  <v-dialog persistent v-model="isOpen" max-width="80%">
    <v-card>
      <v-toolbar
          dark
          flat
      >
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer/>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <slot name="body">
          </slot>
          <template v-if="commonUse">
            <v-subheader inset>Common</v-subheader>
            <v-divider inset/>
            <v-row>
              <v-col>
                <v-text-field
                    label="Created At"
                    disabled
                    v-model="createdAt"
                />
              </v-col>
              <v-col>
                <v-text-field
                    label="Updated At"
                    disabled
                    v-model="lastUpdatedAt"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                    label="Deleted"
                    disabled
                    v-model="deleted"
                />
              </v-col>
              <v-col>
                <v-text-field
                    label="Deleted At"
                    disabled
                    v-model="deletedAt"
                />
              </v-col>
            </v-row>
          </template>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <slot name="footer">
        </slot>
        <v-btn @click="close">
          <font-awesome-icon :icon="['fas', 'window-close']"></font-awesome-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'isOpen',
    'title',
    'commonUse',
    'createdAt',
    'lastUpdatedAt',
    'deleted',
    'deletedAt',
  ],
  data() {
    return {}
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
}
</script>

<style scoped>

</style>
