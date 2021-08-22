<template>
  <v-row align="center">
    <v-col cols="12" align-self="start">
      <v-sheet class="ma-1 pa-1" color="grey lighten-2">
        <PhotoGrid v-bind="gridProps" v-on="{input:this.onPageChange,previous:this.onPageChange,next:this.onPageChange,selectItem:this.getBoard,searchItem:this.searchItem}"></PhotoGrid>
      </v-sheet>
    </v-col>

    <FullDialog v-bind="editModalProps" v-on="{save:editBoard, close: changeEditBoardModal}">
      <template slot="body">
        <v-subheader inset>Basic Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>Created Information</v-subheader>
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Created User"
                v-model="editBoardBody.createdUserIdentifier"
                disabled
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Created DateTime"
                v-model="editBoardBody.createdDateTime"
                disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Modified Information</v-subheader>
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Modified User"
                v-model="editBoardBody.modifiedUserIdentifier"
                disabled
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Modified DateTime"
                v-model="editBoardBody.modifiedDateTime"
                disabled
            />
          </v-col>
        </v-row>
        <v-subheader inset>Board Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>Board Type</v-subheader>
          </v-col>
          <v-col cols="8">
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
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Content Type</v-subheader>
          </v-col>
          <v-col cols="8">
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
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Title</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Title"
                v-model="editBoardBody.title"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Content</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-textarea
                label="Content"
                v-model="editBoardBody.content"
            />
          </v-col>
        </v-row>
      </template>
    </FullDialog>
  </v-row>
</template>

<script>
import PhotoGrid from "@/components/grid/PhotoGrid";
import FullDialog from "@/components/dialog/FullDialog";
import {EDIT_BOARD, GET_BOARD, GET_BOARDS} from "@/api/modules/boards-api";
import {mapMutations} from "vuex";
import {GET_BOARD_TYPES, GET_CONTENT_TYPES} from "@/api/modules/codes-api";
import {getUserId} from "@/api/token-control";

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
      editBoardBody: {
        modifiedBy: getUserId()
      },
      boardTypes: [],
      contentTypes: [],
    };
  },
  methods: {
    ...mapMutations({
      CHANGE_SUCCESS_DIALOG: 'commonDialog/CHANGE_SUCCESS_DIALOG',
      CHANGE_FAIL_DIALOG: 'commonDialog/CHANGE_FAIL_DIALOG',
    }),
    getGridData(pageNumber) {
      GET_BOARDS('MARKET', this.gridProps.itemsPerPage, pageNumber, this.gridProps.searchType, this.gridProps.searchContent)
          .then((response) => {
            console.log(response);
            if (response.data.boardList.content.length > 0) {
              this.gridProps.items = response.data.boardList.content;
              this.gridProps.pageNumber = response.data.boardList.number + 1;
              this.gridProps.totalElements = response.data.boardList.totalElements;
              this.gridProps.totalPages = response.data.boardList.totalPages;
            } else {
              this.gridProps.items = [];
              this.gridProps.pageNumber = 0;
              this.gridProps.totalElements = 0;
              this.gridProps.totalPages = 0;
            }
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    onPageChange(data) {
      this.gridProps.pageNumber = data;
      this.getGridData(data - 1);
    },
    getBoard(item) {
      GET_BOARD(item.id)
          .then(({data}) => {
            this.editBoardBody = Object.assign(this.editBoardBody, data);
            Object.assign(this.editModalProps, data);
            this.changeEditBoardModal();
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    editBoard() {
      EDIT_BOARD(this.editBoardBody.id, this.editBoardBody)
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    changeEditBoardModal() {
      this.editModalProps.isOpen = !this.editModalProps.isOpen
    },
    getBoardTypes() {
      GET_BOARD_TYPES()
          .then(({data}) => {
            this.boardTypes = data;
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    getContentTypes() {
      GET_CONTENT_TYPES()
          .then(({data}) => {
            this.contentTypes = data;
          })
          .catch(this.CHANGE_FAIL_DIALOG);
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
