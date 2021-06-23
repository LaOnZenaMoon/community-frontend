<template>
  <v-app id="inspire">
    <Header></Header>
<!--    <RightSidebar></RightSidebar>-->
    <LeftSidebar></LeftSidebar>

    <v-theme-provider root>
      <v-main class="main-body">
        <div class="main-header"><h3 v-text="this.$route.name"></h3></div>
        <router-view></router-view>
      </v-main>
    </v-theme-provider>

    <Footer></Footer>
    <SuccessDialog></SuccessDialog>
    <FailDialog></FailDialog>
    <WarnDialog></WarnDialog>
  </v-app>
</template>

<script>
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LeftSidebar from "@/components/layout/LeftSidebar";
import SuccessDialog from "@/components/dialog/SuccessDialog";
import FailDialog from "@/components/dialog/FailDialog";
import WarnDialog from "@/components/dialog/WarnDialog";

export default {
  components: {
    WarnDialog,
    FailDialog,
    SuccessDialog,
    Header,
    Footer,
    LeftSidebar,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>

</style>
