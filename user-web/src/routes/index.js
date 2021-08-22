import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from "@/views/Login";
import MainLayout from "@/views/MainLayout";
import Home from "@/views/Home";
import createCommonBoard from "@/views/createCommonBoard";
import {
  FREE_TALK,
  MAGAZINE,
  HOME,
  MARKET,
  MULTIMEDIA,
  NEWS,
  USER,
  USER_ROLE,
  ROLE,
  ROLE_RESOURCE, RESOURCE, ROLE_HIERARCHY, NOT_AUTHORIZED
} from "@/common/pageName";
import PhotoBoard from "@/views/PhotoBoard";
import UserManagement from "@/views/UserManagement";
import UserRoleManagement from "@/views/UserRoleManagement";
import RoleManagement from "@/views/RoleManagement";
import RoleResourceManagement from "@/views/RoleResourceManagement";
import ResourceManagement from "@/views/ResourceManagement";
import RoleHierarchyManagement from "@/views/RoleHierarchyManagement";
import NotAuthorized from "@/views/NotAuthorized";

Vue.use(VueRouter)

const movePage = () => (to, from, next) => {
  next();
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
    redirect: 'home',
    beforeEnter: movePage(),
    children: [
      {
        path: '/home',
        name: HOME,
        component: Home
      },
      {
        path: '/news/board',
        name: NEWS,
        component: createCommonBoard('News'),
      },
      {
        path: '/magazine/board',
        name: MAGAZINE,
        component: createCommonBoard('Magazine'),
      },
      {
        path: '/free-talk/board',
        name: FREE_TALK,
        component: createCommonBoard('Free-talk'),
      },
      {
        path: '/multimedia/board',
        name: MULTIMEDIA,
        component: createCommonBoard('Multimedia'),
      },
      {
        path: '/market/board',
        name: MARKET,
        component: PhotoBoard,
      },
      {
        path: '/user/management',
        name: USER,
        component: UserManagement,
      },
      {
        path: '/setting/user/role/management',
        name: USER_ROLE,
        component: UserRoleManagement,
      },
      {
        path: '/setting/role/management',
        name: ROLE,
        component: RoleManagement,
      },
      {
        path: '/setting/role/resource/management',
        name: ROLE_RESOURCE,
        component: RoleResourceManagement,
      },
      {
        path: '/setting/resource/management',
        name: RESOURCE,
        component: ResourceManagement,
      },
      {
        path: '/setting/role/hierarchy/management',
        name: ROLE_HIERARCHY,
        component: RoleHierarchyManagement,
      },
      {
        path: '/auth/not-authorized',
        name: NOT_AUTHORIZED,
        component: NotAuthorized,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
