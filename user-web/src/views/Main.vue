<template>
  <div>
    <v-row align="center">
      <v-col cols="6" align-self="start">
        <v-sheet min-height="300px" rounded="lg" class="ma-1 pa-1" color="grey lighten-2">
          <DefaultBar></DefaultBar>
        </v-sheet>
        <v-sheet min-height="400px" rounded="lg" class="ma-1 pa-1" color="grey lighten-2">
          <MainGrid v-bind="gridProps1" v-on="{addItem: changeGrid1Modal}"></MainGrid>
        </v-sheet>
      </v-col>
      <v-col cols="6" align-self="start">
        <v-sheet min-height="300px" rounded="lg" class="ma-1 pa-1" color="grey lighten-2">
          <DefaultImage v-bind="{fileName: 'default_picture.jpeg', maxHeight: '300px', maxWidth: '560px'}"></DefaultImage>
        </v-sheet>
        <v-sheet min-height="400px" rounded="lg" class="ma-1 pa-1" color="grey lighten-2">
          <MainGrid v-bind="gridProps2" v-on="{addItem: changeGrid2Modal}"></MainGrid>
        </v-sheet>
      </v-col>
    </v-row>
    <Modal v-bind="grid1ModalProps" v-on="{closeModal: changeGrid1Modal}"></Modal>
    <Modal v-bind="grid2ModalProps" v-on="{closeModal: changeGrid2Modal}">
      <div slot="body">none</div>
    </Modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import Test from '@/data/main';
import MainGrid from "@/components/grid/MainGrid";
import DefaultBar from "@/components/chart/LineChart";
import DefaultImage from "@/components/image/DefaultImage";


export default {
  components: {
    DefaultImage,
    DefaultBar,
    Modal,
    MainGrid,
  },
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
