<template>
  <v-row align='center'>
    <v-col cols='12' align-self='start'>
      <v-sheet rounded='lg' class='ma-1 pa-1' color='grey lighten-2'>
        <DefaultGrid v-bind='gridProps' v-on='{addItem: this.changeAddBoardModal,editItem: this.getBoard,deleteItem: this.changeRemoveBoardModal,input:this.onPageChange,previous:this.onPageChange,next:this.onPageChange}'></DefaultGrid>
      </v-sheet>
    </v-col>
    <Dialog v-bind="addModalProps" v-on="{closeModal: changeAddBoardModal}">
      <template slot="body">
        <v-subheader inset>Board</v-subheader>
        <v-divider inset/>
        <v-select
            label="Board Type"
            v-model="addBoardBody.boardType"
            :items="this.boardTypes"
            item-text="key"
            item-value="value"
            persistent-hint
            return-object
            single-line
        />
        <v-select
            label="Content Type"
            v-model="addBoardBody.contentType"
            :items="this.contentTypes"
            item-text="key"
            item-value="value"
            persistent-hint
            return-object
            single-line
        />
        <v-text-field
            label="Title"
            v-model="addBoardBody.title"
        />
        <v-textarea
            label="Content"
            v-model="addBoardBody.content"
        />
      </template>
      <template slot="footer">
        <v-btn @click="addBoard">
          <font-awesome-icon :icon="['fas', 'save']"></font-awesome-icon>
        </v-btn>
      </template>
    </Dialog>
    <Dialog v-bind="editModalProps" v-on="{closeModal: changeEditBoardModal}">
      <template slot="body">
        <v-subheader inset>Board</v-subheader>
        <v-divider inset/>
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
        <v-text-field
            label="Title"
            v-model="editBoardBody.title"
        />
        <v-textarea
            label="Content"
            v-model="editBoardBody.content"
        />
      </template>
      <template slot="footer">
        <v-btn @click="editBoard">
          <font-awesome-icon :icon="['fas', 'save']"></font-awesome-icon>
        </v-btn>
      </template>
    </Dialog>
    <ConfirmDialog v-bind:isOpen="removeBoardBody.isOpen"
                   v-on="{yes: removeBoard, no:changeRemoveBoardModal}"></ConfirmDialog>
  </v-row>
</template>

<script>
import DefaultGrid from "@/components/grid/DefaultGrid";
import {mapMutations} from "vuex";
import {ADD_BOARD, EDIT_BOARD, GET_BOARD, GET_BOARDS, REMOVE_BOARD} from "@/api/modules/boards-api";
import {makeDefaultGridHeaders, makeDefaultGridItems} from "@/common/utils";
import Dialog from "@/components/dialog/Dialog";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import {GET_BOARD_TYPES, GET_CONTENT_TYPES} from "@/api/modules/codes-api";
import {FREE_TALK, MAGAZINE, MARKET, MULTIMEDIA, NEWS} from "@/common/pageName";

export default {
  components: {
    DefaultGrid,
    Dialog,
    ConfirmDialog,
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
        items: [],
        specialItems: [],
        itemsPerPage: 20,
        searchUse: true,
        actionsUse: true,
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
      },
      addModalProps: {
        isOpen: false,
        title: 'Add',
      },
      addBoardBody: {},
      editModalProps: {
        isOpen: false,
        title: 'Edit',
        commonUse: true,
      },
      editBoardBody: {},
      removeBoardBody: {
        isOpen: false,
        item: {},
      },
      boardTypes: [],
      contentTypes: [],
    }
  },
  methods: {
    ...mapMutations({
      changeSuccessDialog: 'commonDialog/changeSuccessDialog',
      changeFailDialog: 'commonDialog/changeFailDialog',
    }),
    changeAddBoardModal() {
      this.addModalProps.isOpen = !this.addModalProps.isOpen
    },
    changeEditBoardModal() {
      this.editModalProps.isOpen = !this.editModalProps.isOpen
    },
    changeRemoveBoardModal(item) {
      if (item) {
        this.removeBoardBody.item = {};
        this.removeBoardBody.item = item;
      }

      this.removeBoardBody.isOpen = !this.removeBoardBody.isOpen
    },
    getGridData(pageNumber) {
      GET_BOARDS(this.mapPageNameAndBoardType(), this.gridProps.itemsPerPage, pageNumber)
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
    getBoard(item) {
      GET_BOARD(item.id)
          .then(({data}) => {
            this.editBoardBody = data;
            Object.assign(this.editModalProps, data);
            this.changeEditBoardModal();
          })
          .catch(this.changeFailDialog);
    },
    addBoard() {
      ADD_BOARD(this.addBoardBody)
          .then(() => {
            this.changeSuccessDialog();
            this.getGridData();
          })
          .catch(this.changeFailDialog);
    },
    editBoard() {
      EDIT_BOARD(this.editBoardBody.id, this.editBoardBody)
          .then(() => {
            this.changeSuccessDialog();
            this.getGridData();
          })
          .catch(this.changeFailDialog);
    },
    removeBoard() {
      this.changeRemoveBoardModal();
      REMOVE_BOARD(this.removeBoardBody.item.id)
          .then(() => {
            this.changeSuccessDialog();
            this.getGridData();
          })
          .catch(this.changeFailDialog);
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
    mapPageNameAndBoardType() {
      if (this.pageName === NEWS) {
        return 'NEWS';
      } else if (this.pageName === MAGAZINE) {
        return 'MAGAZINE';
      } else if (this.pageName === FREE_TALK) {
        return 'FREE_CONTENTS';
      } else if (this.pageName === MULTIMEDIA) {
        return 'MULTIMEDIA';
      } else if (this.pageName === MARKET) {
        return 'MARKET';
      } else {
        return 'ALL';
      }
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
