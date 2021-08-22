<template>
  <v-row align="center">
    <v-col cols="12" align-self="start">
      <v-alert
          color="#2A3B4D"
          dark
          dense
      >
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']"></font-awesome-icon>
        You don't have access authorities
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>

export default {
  components: {},
  created() {
    this.pageName = this.$route.name;
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>

</style>
