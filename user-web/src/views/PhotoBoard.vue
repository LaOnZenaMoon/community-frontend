<template>
  <v-row align="center">
    <v-col cols="12" align-self="start">
      <v-sheet class="ma-1 pa-1" color="grey lighten-2">
        <PhotoGrid v-bind="gridProps" v-on="{input:this.onPageChange,previous:this.onPageChange,next:this.onPageChange,selectItem:this.selectItem,searchItem:this.searchItem}"></PhotoGrid>
      </v-sheet>
    </v-col>

    <FullDialog v-bind="editModalProps" v-on="{close:this.closeDialog}">
      <template slot="body">
        <v-text-field
            label="BoardId"
            v-model="editBoardBody.id"
            disabled
        />
        <v-select
            label="Board Type"
            v-model="editBoardBody.boardType"
            :items="this.boardTypes"
            item-text="key"
            item-value="value"
            persistent-hint
            return-object
            single-line
        />
        <v-select
            label="Content Type"
            v-model="editBoardBody.contentType"
            :items="this.contentTypes"
            item-text="key"
            item-value="value"
            persistent-hint
            return-object
            single-line
        />
        <v-textarea
            label="Content"
            v-model="editBoardBody.content"
            disabled
        />
      </template>
    </FullDialog>
  </v-row>
</template>

<script>
import PhotoGrid from "@/components/grid/PhotoGrid";
import FullDialog from "@/components/dialog/FullDialog";
import {GET_BOARD, GET_BOARDS} from "@/api/modules/boards-api";
import {mapMutations} from "vuex";
import {GET_BOARD_TYPES, GET_CONTENT_TYPES} from "@/api/modules/codes-api";

export default {
  components: {
    FullDialog,
    PhotoGrid,
  },
  created() {
    this.pageName = this.$route.name;
    this.getBoardTypes();
    this.getContentTypes();
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
        searchType: 'TITLE',
        searchContent: '',
      },
      editModalProps: {
        isOpen: false,
        title: '',
        commonInformation: true,
      },
      editBoardBody: {boardType: ''},
      boardTypes: [],
      contentTypes: [],
    };
  },
  methods: {
    ...mapMutations({
      changeSuccessDialog: 'commonDialog/changeSuccessDialog',
      changeFailDialog: 'commonDialog/changeFailDialog',
    }),
    getGridData(pageNumber) {
      GET_BOARDS('MARKET', this.gridProps.itemsPerPage, pageNumber, this.gridProps.searchType, this.gridProps.searchContent)
          .then(({data}) => {
            if (data.boardList.content.length > 0) {
              this.gridProps.items = data.boardList.content;
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
    selectItem(item) {
      this.editModalProps.isOpen = true;
      GET_BOARD(item.id)
          .then(({data}) => {
            this.editBoardBody = data;
            Object.assign(this.editModalProps, data);
          })
          .catch(this.changeFailDialog);
    },
    closeDialog() {
      this.editModalProps.isOpen = false;
    },
    getBoardTypes() {
      GET_BOARD_TYPES()
          .then(({data}) => {
            this.boardTypes = data;
          })
          .catch(this.changeFailDialog);
    },
    getContentTypes() {
      GET_CONTENT_TYPES()
          .then(({data}) => {
            this.contentTypes = data;
          })
          .catch(this.changeFailDialog);
    },
    searchItem(searchContent) {
      this.gridProps.searchContent = searchContent;
      this.getGridData(0);
    }
  },
}
</script>

<style scoped>

</style>
