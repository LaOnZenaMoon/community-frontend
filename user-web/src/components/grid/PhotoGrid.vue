<template>
  <div>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar
            dark
            color="grey darken-3"
            class="mb-1"
        >
          <v-text-field
              cols="12"
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
            <v-card class="custom-card" @click="selectItem">
              <div class="d-flex flex-no-wrap">
                <v-avatar
                    class="ma-3"
                    size="100"
                    tile
                    color="grey"
                >
                  <v-img :src="item.src"></v-img>
                </v-avatar>

                <div>
                  <v-row>
                    <v-card-title class="subheading font-weight-bold">
                      {{ item.title }}
                    </v-card-title>
                  </v-row>
                  <v-row>
                    <v-card-text>
                      <font-awesome-icon :icon="['fas', 'clipboard']"></font-awesome-icon>
                      {{ item['contentType'] }}
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
    'keys',
    'items',
    'itemsPerPage',
    'pageNumber',
    'totalPages',
  ],
  data() {
    return {
      search: '',
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
  methods: {
    selectItem(data) {
      this.$emit('selectItem', data);
    },
  },
}
</script>

<style scoped>
.v-card__title {
  padding: 22px 16px 16px 16px;
}

.v-card__text {
  padding: 3px 16px;
}

svg {
  margin: 0px 5px;
}

.custom-card {
  cursor: pointer;
}
</style>
