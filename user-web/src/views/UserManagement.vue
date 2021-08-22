<template>
  <v-row align="center">
    <v-col cols="12" align-self="start">
      <v-sheet class="ma-1 pa-1" color="grey lighten-2">
        <DefaultGrid v-bind="gridProps"
                     v-on="{addItem: this.changeAddUserModal,editItem: this.getUser,deleteItem: this.changeRemoveUserModal,input:this.onPageChange,previous:this.onPageChange,next:this.onPageChange,searchItem:this.searchItem}"></DefaultGrid>
      </v-sheet>
    </v-col>
    <FullDialog v-bind="addModalProps" v-on="{save:addUser, close: changeAddUserModal}">
      <template slot="body">
        <v-subheader inset>User Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>User Type</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-select
                label="User Type"
                v-model="addUserBody.type"
                :items="this.usersTypes"
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
            <v-subheader>Name</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Name"
                v-model="addUserBody.name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Identifier</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Identifier"
                v-model="addUserBody.identifier"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Password</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Password"
                type="password"
                v-model="addUserBody.password"
            />
          </v-col>
        </v-row>
      </template>
    </FullDialog>

    <FullDialog v-bind="editModalProps" v-on="{save:editUser, close: changeEditUserModal}">
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
                v-model="editUserBody.createdUserIdentifier"
                disabled
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Created DateTime"
                v-model="editUserBody.createdDateTime"
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
                v-model="editUserBody.modifiedUserIdentifier"
                disabled
            />
          </v-col>
          <v-col cols="4">
            <v-text-field
                label="Modified DateTime"
                v-model="editUserBody.modifiedDateTime"
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
                v-model="editUserBody.useYn"
                :items="this.useYnTypes"
                item-text="key"
                item-value="value"
                persistent-hint
                return-object
                single-line
            />
          </v-col>
        </v-row>
        <v-subheader inset>User Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>User Type</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-select
                label="User Type"
                v-model="editUserBody.type"
                :items="this.usersTypes"
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
            <v-subheader>Name</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Name"
                v-model="editUserBody.name"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Identifier</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Identifier"
                v-model="editUserBody.identifier"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Password</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Password"
                type="password"
                v-model="editUserBody.password"
            />
          </v-col>
        </v-row>
      </template>
    </FullDialog>

    <ConfirmDialog v-bind:isOpen="removeUserBody.isOpen"
                   v-on="{yes: removeUser, no:changeRemoveUserModal}"></ConfirmDialog>
  </v-row>
</template>

<script>
import DefaultGrid from "@/components/grid/DefaultGrid";
import FullDialog from "@/components/dialog/FullDialog";
import {mapMutations} from "vuex";
import {makeDefaultGridHeaders, makeDefaultGridItems} from "@/common/utils";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import {GET_USE_YN_TYPES, GET_USERS_TYPES} from "@/api/modules/codes-api";
import {getUserId} from "@/api/token-control";
import {ADD_USER, EDIT_USER, GET_USER, GET_USERS, REMOVE_USER} from "@/api/modules/users-api";

export default {
  components: {
    DefaultGrid,
    FullDialog,
    ConfirmDialog,
  },
  created() {
    this.pageName = this.$route.name;
    this.getUsersTypes();
    this.getUseYnTypes();
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
        searchType: 'IDENTIFIER',
        searchContent: '',
      },
      addModalProps: {
        isOpen: false,
        title: 'Add',
      },
      addUserBody: {
        createdBy: getUserId()
      },
      editModalProps: {
        isOpen: false,
        title: 'Edit',
        commonUse: true,
      },
      editUserBody: {
        modifiedBy: getUserId()
      },
      removeUserBody: {
        isOpen: false,
        item: {},
      },
      usersTypes: [],
      useYnTypes: [],
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_SUCCESS_DIALOG: 'commonDialog/CHANGE_SUCCESS_DIALOG',
      CHANGE_FAIL_DIALOG: 'commonDialog/CHANGE_FAIL_DIALOG',
    }),
    changeAddUserModal() {
      this.addModalProps.isOpen = !this.addModalProps.isOpen
    },
    changeEditUserModal() {
      this.editModalProps.isOpen = !this.editModalProps.isOpen
    },
    changeRemoveUserModal(item) {
      if (item) {
        this.removeUserBody.item = {};
        this.removeUserBody.item = item;
      }

      this.removeUserBody.isOpen = !this.removeUserBody.isOpen
    },
    getGridData(pageNumber) {
      GET_USERS('ALL', this.gridProps.itemsPerPage, pageNumber, this.gridProps.searchType, this.gridProps.searchContent)
          .then(({data}) => {
            if (data.userList.content.length > 0) {
              this.gridProps.headers = makeDefaultGridHeaders(data.userList.content);
              const defaultGridItems = makeDefaultGridItems(data.userList.content);
              this.gridProps.items = defaultGridItems.items;
              this.gridProps.specialItems = defaultGridItems.specialItems;
              this.gridProps.pageNumber = data.userList.number + 1;
              this.gridProps.totalElements = data.userList.totalElements;
              this.gridProps.totalPages = data.userList.totalPages;
            }
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    getUser(item) {
      GET_USER(item.id)
          .then(({data}) => {
            this.editUserBody = Object.assign(this.editUserBody, data);
            console.log(this.editUserBody);
            Object.assign(this.editModalProps, data);
            this.changeEditUserModal();
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    addUser() {
      ADD_USER(this.addUserBody)
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    editUser() {
      EDIT_USER(this.editUserBody.id, this.editUserBody)
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    removeUser() {
      this.changeRemoveUserModal();
      REMOVE_USER(this.removeUserBody.item.id, getUserId())
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    getUsersTypes() {
      GET_USERS_TYPES()
          .then(({data}) => {
            this.usersTypes = data;
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
    onPageChange(data) {
      this.gridProps.pageNumber = data;
      this.getGridData(data - 1);
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
