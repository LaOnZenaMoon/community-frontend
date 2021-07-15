<template>
  <div>
    <v-container>
      <v-row dense>
        <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="6"
        >
          <v-card
              :color="item.color"
              dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                    class="text-h5"
                    v-text="item.title"
                ></v-card-title>

                <v-card-subtitle v-text="item.artist"></v-card-subtitle>

                <v-card-actions>
<!--                  <v-btn-->
<!--                      v-if="item.artist === 'Ellie Goulding'"-->
<!--                      class="ml-2 mt-3"-->
<!--                      fab-->
<!--                      icon-->
<!--                      height="40px"-->
<!--                      right-->
<!--                      width="40px"-->
<!--                  >-->
<!--                    <v-icon>mdi-play</v-icon>-->
<!--                  </v-btn>-->

<!--                  <v-btn-->
<!--                      v-else-->
<!--                      class="ml-2 mt-5"-->
<!--                      outlined-->
<!--                      rounded-->
<!--                      small-->
<!--                  >-->
<!--                    START RADIO-->
<!--                  </v-btn>-->
                </v-card-actions>
              </div>

              <v-avatar
                  class="ma-3"
                  size="125"
                  tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row dense>
        <v-col
            v-for="card in cards"
            :key="card.title"
            :cols="card.flex"
        >
          <v-card>
            <v-img
                :src="card.src"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Test from '@/data/main';


export default {
  components: {},
  data() {
    return {
      gridProps1: {
        headers: Test.header1,
        items: Test.items1,
        itemsPerPage: 10,
      },
      gridProps2: {
        headers: Test.header2,
        items: Test.items2,
        itemsPerPage: 10,
      },
      grid1ModalProps: {
        isOpen: false,
        title: 'test1 modal',
      },
      grid2ModalProps: {
        isOpen: false,
        title: 'test2 modal',
      },
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People',
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding',
        },
      ],
      cards: [
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
      ],
    }
  },
  methods: {
    changeGrid1Modal() {
      this.grid1ModalProps.isOpen = !this.grid1ModalProps.isOpen
    },
    changeGrid2Modal() {
      this.grid2ModalProps.isOpen = !this.grid2ModalProps.isOpen
    },
    getHealth(healthStatus) {
      if (healthStatus === 'a') return 'red'
      else if (healthStatus === 'b') return 'orange'
      else if (healthStatus === 'c') return 'yellow'
      else if (healthStatus === 'd') return 'green'
      else return 'blue'
    },
    randomScalingFactor() {
      return Math.round(Math.random() * 100);
    },
  }
  ,
}
</script>

<style scoped>

</style>
