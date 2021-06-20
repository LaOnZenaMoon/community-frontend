import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/views/Login";
import MainLayout from "@/views/MainLayout";
import Main from "@/views/Main";
import createBoard from "@/views/createBoard";

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
        path: '/main',
        name: 'Main',
        component: Main
      },
      {
        path: '/notice/board',
        name: 'Notice',
        component: createBoard('Notice'),
      },
      {
        path: '/column/board',
        name: 'Column',
        component: createBoard('Column'),
      },
      {
        path: '/free/community/board',
        name: 'Free Community',
        component: createBoard('Free Community'),
      },
      {
        path: '/expert/community/board',
        name: 'Expert Community',
        component: createBoard('Expert Community'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
