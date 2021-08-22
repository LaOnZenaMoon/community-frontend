<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-sheet class="ma-1 pa-1" color="grey lighten-2">
            <v-carousel height="300px">
              <v-carousel-item
                  v-for="(slide, i) in slides"
                  :key="i"
              >
                <v-sheet
                    :color="colors[i]"
                    height="100%"
                    tile
                >
                  <v-row
                      class="fill-height"
                      align="center"
                      justify="center"
                  >
                    <div class="text-h2">
                      {{ slide }} Slide
                    </div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-sheet class="ma-1 pa-1" color="grey lighten-2">
            <PlainGrid v-bind="newsGridProps"></PlainGrid>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet class="ma-1 pa-1" color="grey lighten-2">
            <PlainGrid v-bind="magazineGridProps"></PlainGrid>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>


import PlainGrid from "@/components/grid/PlainGrid";
import {GET_BOARDS} from "@/api/modules/boards-api";
export default {
  components: {
    PlainGrid
  },
  created() {
    this.getNewsGridData(0);
    this.getMagazineGridData(0);
  },
  data() {
    return {
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      colors: [
        'green',
        'secondary',
        'yellow darken-4',
        'red lighten-2',
        'orange darken-1',
      ],
      newsGridProps: {
        items: [],
        itemsPerPage: 5,
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
        title: true,
        contentType: false,
        content: false,
      },
      magazineGridProps: {
        items: [],
        itemsPerPage: 5,
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
        title: true,
        contentType: false,
        content: false,
      },
    }
  },
  methods: {
    getNewsGridData(pageNumber) {
      GET_BOARDS('NEWS', this.newsGridProps.itemsPerPage, pageNumber, this.newsGridProps.searchType, this.newsGridProps.searchContent)
          .then(({data}) => {
            if (data.boardList.content.length > 0) {
              this.newsGridProps.items = data.boardList.content;
              this.newsGridProps.pageNumber = data.boardList.number + 1;
              this.newsGridProps.totalElements = data.boardList.totalElements;
              this.newsGridProps.totalPages = data.boardList.totalPages;
            } else {
              this.newsGridProps.items = [];
              this.newsGridProps.pageNumber = 0;
              this.newsGridProps.totalElements = 0;
              this.newsGridProps.totalPages = 0;
            }
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
    getMagazineGridData(pageNumber) {
      GET_BOARDS('MAGAZINE', this.magazineGridProps.itemsPerPage, pageNumber, this.magazineGridProps.searchType, this.magazineGridProps.searchContent)
          .then(({data}) => {
            if (data.boardList.content.length > 0) {
              this.magazineGridProps.items = data.boardList.content;
              this.magazineGridProps.pageNumber = data.boardList.number + 1;
              this.magazineGridProps.totalElements = data.boardList.totalElements;
              this.magazineGridProps.totalPages = data.boardList.totalPages;
            } else {
              this.magazineGridProps.items = [];
              this.magazineGridProps.pageNumber = 0;
              this.magazineGridProps.totalElements = 0;
              this.magazineGridProps.totalPages = 0;
            }
          })
          .catch(this.CHANGE_FAIL_DIALOG);
    },
  }
  ,
}
</script>

<style scoped>

</style>
