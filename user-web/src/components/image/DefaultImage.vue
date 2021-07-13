<template>
  <v-img
      :src="getImageSource"
      :max-height="maxHeight"
      :max-width="maxWidth"
  ></v-img>
</template>

<script>

import {GATEWAY_SERVER} from "@/common/environment";

export default {
  props: [
    'fileName',
    'maxHeight',
    'maxWidth',
  ],
  computed: {
    getImageSource() {
      return `${GATEWAY_SERVER}/community-api/file/${this.fileName}/single-image`
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>
