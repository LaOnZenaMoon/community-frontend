<template>
  <v-dialog
    v-model="isOpen"
    max-width="290"
    persistent
  >
    <v-card>
      <v-card-title class="headline">
        Confirm
      </v-card-title>

      <v-card-text>
        Are you sure to process?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="red darken-1"
          text
          @click="this.no"
        >
          No
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="this.yes"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'isOpen',
  ],
  methods: {
    yes() {
      this.$emit('yes');
    },
    no() {
      this.$emit('no');
    },
  },
}
</script>

<style scoped>

</style>
