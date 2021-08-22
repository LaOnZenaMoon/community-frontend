<template>
  <div>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        hide-default-footer
        no-data-text="none"
    >
      <template v-slot:header v-if="headerUse">
        <v-toolbar class="mb-1">
          <v-col cols="6"></v-col>
          <v-col cols="5">
            <v-text-field
                v-if="searchUse"
                v-model="search"
                clearable
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                @keyup.enter="searchItem"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-icon color="lightgrey" @click="addItem">mdi-plus-box-outline</v-icon>
          </v-col>
        </v-toolbar>
      </template>

      <template slot="no-data">
        <v-row>
          <v-col>
            <v-sheet class="ma-1 pa-1 text-center" color="white" v-text="noDataText"></v-sheet>
          </v-col>
        </v-row>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
              cols="12"
              v-for="item in props.items"
              :key="item.name"
          >
            <v-card class="custom-card" @click="selectItem(item)">
              <div class="d-flex flex-no-wrap">
                <div>
                  <v-row>
                    <v-card-title class="subheading font-weight-bold" v-if="title">
                      {{ item['title'] }}
                    </v-card-title>
                  </v-row>
                  <v-row>
                    <v-card-text v-if="contentType">
                      <font-awesome-icon :icon="['fas', 'clipboard']"></font-awesome-icon>
                      {{ item['contentType'] }}
                    </v-card-text>

                    <v-card-text class="mt-4" v-if="content">
                      {{ item['content'] }}
                    </v-card-text>

                    <v-card-text>
                      <font-awesome-icon :icon="['fas', 'user']"></font-awesome-icon>
                      {{ item['createdUserIdentifier'] }}
                      <font-awesome-icon :icon="['fas', 'calendar']"></font-awesome-icon>
                      {{ item['createdDateTime'] }}
                    </v-card-text>
                  </v-row>
                </div>

              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>

    <div class="text-center pt-2" v-if="footerUse">
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
export default {
  props: [
    'keys',
    'items',
    'itemsPerPage',
    'pageNumber',
    'totalPages',
    'searchUse',
    'headerUse',
    'footerUse',
    'title',
    'contentType',
    'content',
  ],
  data() {
    return {
      search: '',
      page: 1,
      noDataText: 'No data'
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    },
    pageNumberLocal: {
      get() {
        return this.pageNumber;
      },
      set(data) {
        this.$emit('input', data);
      },
    },
  },
  methods: {
    selectItem(data) {
      this.$emit('selectItem', data);
    },
    searchItem() {
      this.$emit('searchItem', this.search);
    },
    addItem() {
      this.$emit('addItem');
    },
  },
}
</script>

<style scoped>
.v-card__title {
  padding: 22px 30px 0px 30px;
}

.v-card__text {
  padding: 10px 30px 20px 30px;
}

svg {
  margin: 0px 5px;
}

.custom-card {
  cursor: pointer;
}
</style>
