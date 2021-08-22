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
        <v-subheader inset>Resource Information</v-subheader>
        <v-divider inset/>
        <v-row>
          <v-col cols="4">
            <v-subheader>Resource Name</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Resource Name"
                v-model="addBody.resourceName"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Resource Type</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-select
                label="Resource Type"
                v-model="addBody.resourceType"
                :items="this.resourceTypes"
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
            <v-subheader>HTTP Method</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="HTTP Method"
                v-model="addBody.httpMethod"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-subheader>Order Number</v-subheader>
          </v-col>
          <v-col cols="8">
            <v-text-field
                label="Order Number"
                v-model="addBody.orderNumber"
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
import {ADD_RESOURCE, GET_RESOURCES, REMOVE_RESOURCE} from "@/api/modules/authorization-api";
import {GET_RESOURCE_TYPES} from "@/api/modules/codes-api";

export default {
  components: {
    DefaultGrid,
    FullDialog,
    ConfirmDialog,
  },
  created() {
    this.pageName = this.$route.name;
    this.getResourceTypes();
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
      resourceTypes: [],
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
      GET_RESOURCES(this.gridProps.itemsPerPage, pageNumber, this.gridProps.searchType, this.gridProps.searchContent)
          .then(({data}) => {
            if (data.resourceList.content.length > 0) {
              this.gridProps.headers = makeDefaultGridHeaders(data.resourceList.content);
              const defaultGridItems = makeDefaultGridItems(data.resourceList.content);
              this.gridProps.items = defaultGridItems.items;
              this.gridProps.specialItems = defaultGridItems.specialItems;
              this.gridProps.pageNumber = data.resourceList.number + 1;
              this.gridProps.totalElements = data.resourceList.totalElements;
              this.gridProps.totalPages = data.resourceList.totalPages;
            }
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    add() {
      ADD_RESOURCE(this.addBody)
          .then(() => {
            this.CHANGE_SUCCESS_DIALOG();
            this.getGridData(0);
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    remove() {
      this.changeRemoveModal();
      REMOVE_RESOURCE(this.removeBody.item.id, getUserId())
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
    },
    getResourceTypes() {
      GET_RESOURCE_TYPES()
          .then(({data}) => {
            this.resourceTypes = data;
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
  },
}
</script>

<style scoped>

</style>
