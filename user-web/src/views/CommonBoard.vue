<template>
  <v-row align="center">
    <v-col cols="12" align-self="start">
      <v-sheet class="ma-1 pa-1" color="grey lighten-2">
        <DefaultGrid v-bind="gridProps"
                     v-on="{addItem: changeAddBoardModal,
                     editItem: getBoard,
                     deleteItem: changeRemoveBoardModal,
                     input: onBoardPageChange,
                     previous: onBoardPageChange,
                     next: onBoardPageChange,
                     searchItem: searchItem}">
        </DefaultGrid>
      </v-sheet>
    </v-col>
    <FullDialog v-bind="addBoardModalProps" v-on="{save:addBoard, close: changeAddBoardModal}">
      <template slot="body">
        <v-subheader inset>Board Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>Board Type</v-subheader>
          </v-col>
          <v-col cols="8">
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
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Content Type</v-subheader>
          </v-col>
          <v-col cols="8">
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
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Title</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Title"
                v-model="addBoardBody.title"
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
                v-model="addBoardBody.content"
            />
          </v-col>
        </v-row>
      </template>
    </FullDialog>

    <FullDialog v-bind="editBoardModalProps" v-on="{save:editBoard, close: changeEditBoardModal}">
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
        <v-row>
          <v-col cols="4">
            <v-subheader>Use YN Types</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-select
                label="User Type"
                v-model="editBoardBody.useYn"
                :items="this.useYnTypes"
                item-text="key"
                item-value="value"
                persistent-hint
                return-object
                single-line
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
        <v-subheader inset>Comment Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="12">
            <PlainGrid v-bind="commentGridProps" v-on="{
              addItem: changeAddCommentModal,
              selectItem: getComment,
              input: onCommentPageChange,
              previous: onCommentPageChange,
              next: onCommentPageChange}">
            </PlainGrid>
          </v-col>
        </v-row>
      </template>
    </FullDialog>

    <Dialog v-bind:isOpen="addCommentModalProps.isOpen" v-on="{close: changeAddCommentModal}">
      <template slot="body">
        <v-subheader inset>Comment Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>Content Type</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-select
                label="Content Type"
                v-model="addCommentBody.commentType"
                :items="this.commentTypes"
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
            <v-subheader>Content</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-textarea
                label="Content"
                v-model="addCommentBody.content"
            />
          </v-col>
        </v-row>
      </template>
      <template slot="footer">
        <v-btn @click="addComment">
          <font-awesome-icon :icon="['fas', 'save']"></font-awesome-icon>
        </v-btn>
      </template>
    </Dialog>

    <Dialog v-bind:isOpen="editCommentModalProps.isOpen" v-on="{close: changeEditCommentModal}">
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
                v-model="editCommentBody.createdUserIdentifier"
                disabled
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Created DateTime"
                v-model="editCommentBody.createdDateTime"
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
                v-model="editCommentBody.modifiedUserIdentifier"
                disabled
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Modified DateTime"
                v-model="editCommentBody.modifiedDateTime"
                disabled
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Use YN Types</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-select
                label="User Type"
                v-model="editCommentBody.useYn"
                :items="this.useYnTypes"
                item-text="key"
                item-value="value"
                persistent-hint
                return-object
                single-line
            />
          </v-col>
        </v-row>
        <v-subheader inset>Comment Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>Comment ID</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Comment ID"
                disabled
                v-model="editCommentBody.id"
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
                v-model="editCommentBody.commentType"
                :items="this.commentTypes"
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
            <v-subheader>Content</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-textarea
                label="Content"
                v-model="editCommentBody.content"
            />
          </v-col>
        </v-row>
      </template>
      <template slot="footer">
        <v-btn @click="editComment">
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
import Dialog from "@/components/dialog/Dialog";
import FullDialog from "@/components/dialog/FullDialog";
import {mapMutations} from "vuex";
import {ADD_BOARD, EDIT_BOARD, GET_BOARD, GET_BOARDS, REMOVE_BOARD} from "@/api/modules/boards-api";
import {makeDefaultGridHeaders, makeDefaultGridItems} from "@/common/utils";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import {GET_BOARD_TYPES, GET_COMMENTS_TYPES, GET_CONTENT_TYPES, GET_USE_YN_TYPES} from "@/api/modules/codes-api";
import {FREE_TALK, MAGAZINE, MARKET, MULTIMEDIA, NEWS} from "@/common/pageName";
import {getUserId} from "@/api/token-control";
import {ADD_COMMENT, EDIT_COMMENT, GET_COMMENT, GET_COMMENTS} from "@/api/modules/comments-api";
import PlainGrid from "@/components/grid/PlainGrid";

export default {
  components: {
    DefaultGrid,
    PlainGrid,
    Dialog,
    FullDialog,
    ConfirmDialog,
  },
  created() {
    this.pageName = this.$route.name;
    this.getBoardTypes();
    this.getContentTypes();
    this.getUseYnTypes();
    this.getCommentTypes();
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
        searchType: 'TITLE',
        searchContent: '',
      },
      commentGridProps: {
        items: [],
        itemsPerPage: 5,
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
        title: false,
        contentType: false,
        content: true,
        searchUse: false,
        headerUse: true,
        footerUse: true,
      },
      addBoardModalProps: {
        isOpen: false,
        title: 'Add',
      },
      addCommentModalProps: {
        isOpen: false,
        title: 'Add',
      },
      addBoardBody: {
        createdBy: getUserId()
      },
      addCommentBody: {
        createdBy: getUserId()
      },
      editBoardModalProps: {
        isOpen: false,
        title: 'Edit',
        commonUse: true,
      },
      editCommentModalProps: {
        isOpen: false,
        title: 'Edit',
        commonUse: true,
      },
      editBoardBody: {
        modifiedBy: getUserId()
      },
      editCommentBody: {
        modifiedBy: getUserId()
      },
      removeBoardBody: {
        isOpen: false,
        item: {},
      },
      boardTypes: [],
      contentTypes: [],
      useYnTypes: [],
      commentTypes: [],
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_SUCCESS_DIALOG: 'commonDialog/CHANGE_SUCCESS_DIALOG',
      CHANGE_FAIL_DIALOG: 'commonDialog/CHANGE_FAIL_DIALOG',
    }),
    changeAddBoardModal() {
      this.addBoardModalProps.isOpen = !this.addBoardModalProps.isOpen
    },
    changeAddCommentModal() {
      this.addCommentModalProps.isOpen = !this.addCommentModalProps.isOpen
    },
    changeEditBoardModal() {
      this.editBoardModalProps.isOpen = !this.editBoardModalProps.isOpen
    },
    changeEditCommentModal() {
      this.editCommentModalProps.isOpen = !this.editCommentModalProps.isOpen
    },
    changeRemoveBoardModal(item) {
      if (item) {
        this.removeBoardBody.item = {};
        this.removeBoardBody.item = item;
      }

      this.removeBoardBody.isOpen = !this.removeBoardBody.isOpen
    },
    getGridData(pageNumber) {
      GET_BOARDS(this.mapPageNameAndBoardType(), this.gridProps.itemsPerPage, pageNumber, this.gridProps.searchType, this.gridProps.searchContent)
          .then(({data}) => {
            if (data.boardList.content.length > 0) {
              this.gridProps.headers = makeDefaultGridHeaders(data.boardList.content);
              const defaultGridItems = makeDefaultGridItems(data.boardList.content);
              this.gridProps.items = defaultGridItems.items;
              this.gridProps.specialItems = defaultGridItems.specialItems;
              this.gridProps.pageNumber = data.boardList.number + 1;
              this.gridProps.totalElements = data.boardList.totalElements;
              this.gridProps.totalPages = data.boardList.totalPages;
            } else {
              this.gridProps.items = [];
              this.gridProps.pageNumber = 0;
              this.gridProps.totalElements = 0;
              this.gridProps.totalPages = 0;
            }
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    getBoard(item) {
      GET_BOARD(item.id)
          .then(({data}) => {
            this.editBoardBody = Object.assign(this.editBoardBody, data);
            Object.assign(this.editBoardModalProps, data);
            this.changeEditBoardModal();
          })
          .catch(this.CHANGE_FAIL_DIALOG);
      this.getCommentGridData(item.id, 0);
      this.addCommentBody.boardId = item.id;
    },
    addBoard() {
      ADD_BOARD(this.addBoardBody)
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
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
    removeBoard() {
      this.changeRemoveBoardModal();
      REMOVE_BOARD(this.removeBoardBody.item.id, getUserId())
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
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
    getUseYnTypes() {
      GET_USE_YN_TYPES()
          .then(({data}) => {
            this.useYnTypes = data;
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    getCommentTypes() {
      GET_COMMENTS_TYPES()
          .then(({data}) => {
            this.commentTypes = data;
          })
          .catch(this.CHANGE_FAIL_DIALOG);
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
    onBoardPageChange(data) {
      this.gridProps.pageNumber = data;
      this.getGridData(data - 1);
    },
    onCommentPageChange(data) {
      this.commentGridProps.pageNumber = data;
      this.getCommentGridData(this.addCommentBody.boardId, data - 1);
    },
    searchItem(searchContent) {
      this.gridProps.searchContent = searchContent;
      this.getGridData(0);
    },
    getCommentGridData(boardId, pageNumber) {
      GET_COMMENTS(boardId, this.commentGridProps.itemsPerPage, pageNumber, this.commentGridProps.searchType, this.commentGridProps.searchContent)
          .then(({data}) => {
            if (data.commentList.content.length > 0) {
              this.commentGridProps.items = data.commentList.content;
              this.commentGridProps.pageNumber = data.commentList.number + 1;
              this.commentGridProps.totalElements = data.commentList.totalElements;
              this.commentGridProps.totalPages = data.commentList.totalPages;
            } else {
              this.commentGridProps.items = [];
              this.commentGridProps.pageNumber = 0;
              this.commentGridProps.totalElements = 0;
              this.commentGridProps.totalPages = 0;
            }
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    getComment(data) {
      GET_COMMENT(data.id)
          .then(() => {
            this.editCommentBody = Object.assign(this.editCommentBody, data);
            Object.assign(this.editCommentModalProps, data);
            this.changeEditCommentModal();
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    addComment() {
      ADD_COMMENT(this.addCommentBody)
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getCommentGridData(this.addCommentBody.boardId, 0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    editComment() {
      EDIT_COMMENT(this.editCommentBody.id, this.editCommentBody)
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getCommentGridData(this.addCommentBody.boardId, 0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
  },
}
</script>

<style scoped>

</style>
