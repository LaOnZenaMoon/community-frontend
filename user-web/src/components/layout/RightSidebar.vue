<template>
    <v-navigation-drawer
        :value="GET_RIGHT_DRAWER"
        app
        clipped
        right
        width="200"
        permanent
        expand-on-hover
    >
        <v-list link>
            <v-list-item>
              <v-icon style="margin-right: 10px;">mdi-file-document</v-icon>
              <v-list-item-title>document</v-list-item-title>
            </v-list-item>
          <v-list-item>
            <v-icon style="margin-right: 10px;">mdi-fan</v-icon>
            <v-list-item-title>fan</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon style="margin-right: 10px;">mdi-camera</v-icon>
            <v-list-item-title>camera</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon style="margin-right: 10px;"> mdi-server</v-icon>
            <v-list-item-title>servers</v-list-item-title>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            GET_RIGHT_DRAWER: 'sidebar/GET_RIGHT_DRAWER',
        }),
    },
}
</script>

<style scoped>

</style>
