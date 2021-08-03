import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/views/Login";
import MainLayout from "@/views/MainLayout";
import Main from "@/views/Main";
import createBasicBoard from "@/views/createBasicBoard";
import {FREE_TALK, MAGAZINE, HOME, MARKET, MULTIMEDIA, NEWS} from "@/common/pageName";
import PhotoBoard from "@/views/PhotoBoard";

Vue.use(VueRouter)

const movePage = () => (to, from, next) => {
  // basicLogger(from);
  // basicLogger(to);
  // basicLogger(next);

  // if (checkTokenExpired()) {
    next();
    // return;
  // }

  // moveSignInPage();
};


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: MainLayout,
    redirect: 'main',
    beforeEnter: movePage(),
    children: [
      {
        path: '/home',
        name: HOME,
        component: Main
      },
      {
        path: '/news/board',
        name: NEWS,
        component: createBasicBoard('News'),
      },
      {
        path: '/magazine/board',
        name: MAGAZINE,
        component: createBasicBoard('Magazine'),
      },
      {
        path: '/free-talk/board',
        name: FREE_TALK,
        component: createBasicBoard('Free-talk'),
      },
      {
        path: '/multimedia/board',
        name: MULTIMEDIA,
        component: createBasicBoard('Multimedia'),
      },
      {
        path: '/market/board',
        name: MARKET,
        // component: createBasicBoard('Market'),
        component: PhotoBoard,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
