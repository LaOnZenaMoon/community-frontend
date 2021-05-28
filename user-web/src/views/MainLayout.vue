<template>
  <v-app id="inspire">
    <Header></Header>
    <RightSidebar></RightSidebar>
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
import RightSidebar from "@/components/layout/RightSidebar";
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
    RightSidebar,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.main-header {
  height: 50px;
  width: 100%;
  padding: 11px 30px;
  color: #DFE4ED;
  /*background-image: url('../../public/img/header-profile-skin-2.png');*/
  /*background-size: 100%;*/
}
</style>
