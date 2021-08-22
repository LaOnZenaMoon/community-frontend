<template>
  <div>
    <v-data-table
        dense multi-sort
        :headers="headers" :items="items" :items-per-page="itemsPerPage"
        :header-props="{
        }"
        :custom-filter="filterCustom"
        :calculate-widths="true"
        :show-select="selectUse"
        :single-select="selectUse"
        :item-key="selectKey"
        @item-selected="selectItem"
        hide-default-footer
    >
      <template v-slot:top v-if="searchUse">
        <v-toolbar flat>
          <v-row no-gutters class="mt-2">
            <v-spacer></v-spacer>
            <v-col cols="auto" sm="2" class="">
<!--              <v-select-->
<!--                  outlined-->
<!--                  dense-->
<!--                  label="Condition"-->
<!--                  v-model="searchCondition"-->
<!--                  :items="searchConditions"-->
<!--                  v-on:keyup.enter="searchItem()"-->
<!--              >-->
<!--              </v-select>-->
            </v-col>
            <v-col cols="auto" sm="3" class="ml-4">
              <v-text-field
                  v-model="search"
                  dense
                  flat
                  hide-details
                  solo-inverted
                  v-on:keyup.enter="searchItem()"
              ></v-text-field>
            </v-col>
            <v-col cols="auto" sm="1" class="ml-4 mt-2">
              <v-icon color="lightgrey" @click="searchItem">mdi-magnify</v-icon>
            </v-col>

            <v-col cols="auto" sm="1" class="mt-2">
              <v-icon color="lightgrey" @click="addItem">mdi-plus-box-outline</v-icon>
            </v-col>
          </v-row>
        </v-toolbar>
      </template>

      <template v-for="specialItem in specialItems" v-slot:[specialItem.slotName]="{item}">
        <slot :item="item">
          <v-edit-dialog
              :return-value.sync="item[specialItem.name]"
              @open="open"
              @close="close"
              :key="specialItem.name"
          >
            <v-icon>mdi-code-braces</v-icon>
            <template v-slot:input>
              <v-textarea
                  v-model="item[specialItem.name]"
                  :full-width="true"
              ></v-textarea>
              <div class="v-small-dialog__actions">
                <v-btn @click="postJsonFormatter(item[specialItem.name])">To JSON Formatter</v-btn>
              </div>
            </template>
          </v-edit-dialog>
        </slot>
      </template>

      <template v-slot:item.actions="{ item }" v-if="actionsUse">
        <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
            small
            @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        no data
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
          v-model="pageNumberLocal"
          :length="totalPages"
          :total-visible="10"
          color="grey"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import {parseDate} from "@/common/utils";

export default {
  mounted() {

  },
  props: [
    'title',
    'searchConditions',
    'searchUse',
    'actionsUse',
    'selectUse',
    'selectKey',
    'headers',
    'items',
    'specialItems',
    'itemsPerPage',
    'pageNumber',
    'totalElements',
    'totalPages',
  ],
  computed: {
    pageNumberLocal: {
      get() {
        return this.pageNumber;
      },
      set(data) {
        this.$emit('input', data);
      },
    },
  },
  data() {
    return {
      search: '',
      searchCondition: '',
      objectDialog: false,
      objectDialogColor: '',
      objectDialogText: '',

    }
  },
  methods: {
    searchItem() {
      this.$emit('searchItem', this.search);
    },
    addItem() {
      this.$emit('addItem');
    },
    editItem(item) {
      this.$emit('editItem', item);
    },
    deleteItem(item) {
      this.$emit('deleteItem', item);
    },
    selectItem(data) {
      this.$emit('selectItem', data);
    },
    parseDate,
    filterCustom(value, search, item) {
      if (value == null || search == null || item == null) {
        return;
      }
      const searchToString = search.toString().toLocaleLowerCase();
      const valueToString = value.toString().toLocaleLowerCase();
      return valueToString.indexOf(searchToString) !== -1;
    },
    open() {
      this.objectDialog = true
      this.objectDialogColor = 'info'
      this.objectDialogText = 'Dialog opened'
    },
    close() {
    },
    postJsonFormatter(json) {
      window.open('https://jsonformatter.curiousconcept.com/?data=' + json);
    },
  },
}
</script>


<style scoped>
.v-data-table {
  max-width: 100% !important;
}
</style>
