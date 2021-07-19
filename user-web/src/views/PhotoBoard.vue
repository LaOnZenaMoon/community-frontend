<template>
  <v-row align='center'>
    <v-col cols='12' align-self='start'>
      <v-sheet class='ma-1 pa-1' color='grey lighten-2'>
        <PhotoGrid v-bind='gridProps' v-on='{input:this.onPageChange,previous:this.onPageChange,next:this.onPageChange,selectItem:this.selected}'></PhotoGrid>
      </v-sheet>
    </v-col>

    <FullDialog v-bind='dialogProps' v-on="{close:this.closeDialog}"></FullDialog>
  </v-row>
</template>

<script>
import PhotoGrid from "@/components/grid/PhotoGrid";
import FullDialog from "@/components/dialog/FullDialog";
import {GET_BOARDS} from "@/api/modules/boards-api";
import {makeDefaultGridHeaders, makeDefaultGridItems} from "@/common/utils";

export default {
  components: {
    FullDialog,
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
        keys: ['contentType'],
        items: [],
        specialItems: [],
        itemsPerPage: 10,
        searchUse: true,
        actionsUse: true,
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
      },
      dialogProps: {
        isOpen: false,
        title: '',
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
    selected(data) {
      console.log(data);
      this.dialogProps.isOpen = true;
    },
    closeDialog() {
      this.dialogProps.isOpen = false;
    },
  },
}
</script>

<style scoped>

</style>
