<template>
  <v-row align='center'>
    <v-col cols='12' align-self='start'>
      <v-sheet rounded='lg' class='ma-1 pa-1' color='grey lighten-2'>
        <PhotoGrid v-bind='gridProps' v-on='{input:this.onPageChange,previous:this.onPageChange,next:this.onPageChange}'></PhotoGrid>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import PhotoGrid from "@/components/grid/PhotoGrid";
import {GET_BOARDS} from "@/api/modules/boards-api";
import {makeDefaultGridHeaders, makeDefaultGridItems} from "@/common/utils";

export default {
  components: {
    PhotoGrid,
  },
  created() {
    this.pageName = this.$route.name;
    this.getGridData(0);
  },
  data() {
    return {
      gridProps: {
        headers: [],
        keys: ['contentType', 'createdUserIdentifier', 'createdDateTime'],
        items: [],
        specialItems: [],
        itemsPerPage: 20,
        searchUse: true,
        actionsUse: true,
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
      },
    };
  },
  methods: {
    getGridData(pageNumber) {
      GET_BOARDS('MARKET', this.gridProps.itemsPerPage, pageNumber)
          .then(({data}) => {
            if (data.boardList.content.length > 0) {
              this.gridProps.headers = makeDefaultGridHeaders(data.boardList.content);
              const defaultGridItems = makeDefaultGridItems(data.boardList.content);
              this.gridProps.items = defaultGridItems.items;
              this.gridProps.specialItems = defaultGridItems.specialItems;
              this.gridProps.pageNumber = data.boardList.number + 1;
              this.gridProps.totalElements = data.boardList.totalElements;
              this.gridProps.totalPages = data.boardList.totalPages;
            }
          })
          .catch(this.changeFailDialog);
    },
    onPageChange(data) {
      this.gridProps.pageNumber = data;
      this.getGridData(data - 1);
    },
  },
}
</script>

<style scoped>

</style>
