<template>
  <v-row align="center">
    <v-col cols="12" align-self="start">
      <v-sheet class="ma-1 pa-1" color="grey lighten-2">
        <DefaultGrid v-bind="gridProps"
                     v-on="{addItem: this.changeAddModal,deleteItem: this.changeRemoveModal,input:this.onPageChange,previous:this.onPageChange,next:this.onPageChange,searchItem:this.searchItem}"></DefaultGrid>
      </v-sheet>
    </v-col>
    <FullDialog v-bind="addModalProps" v-on="{save:add, close: changeAddModal}">
      <template slot="body">
        <v-subheader inset>Role Resource Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>Role Name</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Role Name"
                v-model="addBody.roleName"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Role Description</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Role Description"
                v-model="addBody.roleDescription"
            />
          </v-col>
        </v-row>
      </template>
    </FullDialog>

    <ConfirmDialog v-bind:isOpen="removeBody.isOpen"
                   v-on="{yes: remove, no:changeRemoveModal}"></ConfirmDialog>
  </v-row>
</template>

<script>
import DefaultGrid from "@/components/grid/DefaultGrid";
import FullDialog from "@/components/dialog/FullDialog";
import {mapMutations} from "vuex";
import {makeDefaultGridHeaders, makeDefaultGridItems} from "@/common/utils";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import {getUserId} from "@/api/token-control";
import {ADD_ROLE, GET_ROLES, REMOVE_ROLE} from "@/api/modules/authorization-api";

export default {
  components: {
    DefaultGrid,
    FullDialog,
    ConfirmDialog,
  },
  created() {
    this.pageName = this.$route.name;
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
        searchType: '',
        searchContent: '',
      },
      addModalProps: {
        isOpen: false,
        title: 'Add',
      },
      addBody: {
        createdBy: getUserId()
      },
      removeBody: {
        isOpen: false,
        item: {},
      },
    }
  },
  methods: {
    ...mapMutations({
      CHANGE_SUCCESS_DIALOG: 'commonDialog/CHANGE_SUCCESS_DIALOG',
      CHANGE_FAIL_DIALOG: 'commonDialog/CHANGE_FAIL_DIALOG',
    }),
    changeAddModal() {
      this.addModalProps.isOpen = !this.addModalProps.isOpen
    },
    changeRemoveModal(item) {
      if (item) {
        this.removeBody.item = {};
        this.removeBody.item = item;
      }

      this.removeBody.isOpen = !this.removeBody.isOpen
    },
    getGridData(pageNumber) {
      GET_ROLES(this.gridProps.itemsPerPage, pageNumber, this.gridProps.searchType, this.gridProps.searchContent)
          .then(({data}) => {
            if (data.roleList.content.length > 0) {
              this.gridProps.headers = makeDefaultGridHeaders(data.roleList.content);
              const defaultGridItems = makeDefaultGridItems(data.roleList.content);
              this.gridProps.items = defaultGridItems.items;
              this.gridProps.specialItems = defaultGridItems.specialItems;
              this.gridProps.pageNumber = data.roleList.number + 1;
              this.gridProps.totalElements = data.roleList.totalElements;
              this.gridProps.totalPages = data.roleList.totalPages;
            }
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    add() {
      ADD_ROLE(this.addBody)
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    remove() {
      this.changeRemoveModal();
      REMOVE_ROLE(this.removeBody.item.id, getUserId())
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
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
