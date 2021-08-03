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
            <PlainGrid v-bind="gridProps"></PlainGrid>
          </v-sheet>
        </v-col>
        <v-col cols="6">
          <v-sheet class="ma-1 pa-1" color="grey lighten-2">
            <PlainGrid v-bind="gridProps"></PlainGrid>
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
    this.getGridData(0);
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
      gridProps: {
        itemsPerPage: 5,
        pageNumber: 0,
        totalElements: 0,
        totalPages: 0,
        contentType: false,
      },
    }
  },
  methods: {
    getGridData(pageNumber) {
      GET_BOARDS('NEWS', this.gridProps.itemsPerPage, pageNumber, this.gridProps.searchType, this.gridProps.searchContent)
          .then(({data}) => {
            if (data.boardList.content.length > 0) {
              this.gridProps.items = data.boardList.content;
              this.gridProps.pageNumber = data.boardList.number + 1;
              this.gridProps.totalElements = data.boardList.totalElements;
              this.gridProps.totalPages = data.boardList.totalPages;
            }
          })
          .catch(this.changeFailDialog);
    },
  }
  ,
}
</script>

<style scoped>

</style>
