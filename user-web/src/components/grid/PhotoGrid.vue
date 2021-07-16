<template>
  <div>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        :sort-desc="sortDesc"
        hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
        >
          <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-magnify"
                label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
                v-model="sortDesc"
                mandatory
            >
              <v-btn
                  large
                  depressed
                  color="blue"
                  :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                  large
                  depressed
                  color="blue"
                  :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="12"
          >
            <v-card>
              <div class="d-flex flex-no-wrap">
                <v-avatar
                    class="ma-3"
                    size="125"
                    tile
                    color="grey"
                >
                  <v-img :src="item.src"></v-img>
                </v-avatar>

                <v-list dense>
                  <v-card-title class="subheading font-weight-bold">
                    {{ item.title }}
                  </v-card-title>

                  <v-list-item
                      v-for="(key, index) in filteredKeys"
                      :key="index"
                  >
                    <v-list-item-content
                        class="align-end"
                        :class="{ 'blue--text': sortBy === key }"
                    >
                      {{ item[key] }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
    <div class="text-center pt-2">
      <v-pagination
          v-model="pageNumberLocal"
          :length="totalPages"
          :total-visible="10"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'title',
    'searchConditions',
    'keys',
    'items',
    'itemsPerPage',
    'pageNumber',
    'totalElements',
    'totalPages',
      'sortBy',
  ],
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
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
  methods: {},
}
</script>

<style scoped>

</style>
