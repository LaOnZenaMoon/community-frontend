<template>
  <v-row align='center'>
    <v-col cols='12' align-self='start'>
      <v-sheet rounded='lg' class='ma-1 pa-1' color='grey lighten-2'>
        <DefaultGrid v-bind='groupsGridProps'
                     v-on='{addItem: this.changeAddGroupModal,editItem: this.getGroup,deleteItem: this.changeRemoveGroupModal}'></DefaultGrid>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';
import DefaultGrid from "@/components/grid/DefaultGrid";

export default {
  components: {
    DefaultGrid,
  },
  data() {
    return {
      items: [],
      pageName: '',
    }
  },
  methods: {
    getPostData: function () {
      return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(({ data }) => {
          this.items = data;
        }).catch();
    },
  },
  created() {
    this.getPostData();
    this.pageName = this.$route.name;
  }
}
</script>

<style scoped>

</style>
