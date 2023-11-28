/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";
import { publicPath, routerMode } from "@/config/settings";

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

export const asyncRoutes = [
  // {
  //   path: "/",
  //   component: Layout,
  //   redirect: "index",
  //   children: [
  //     {
  //       path: "index",
  //       name: "Index",
  //       component: () => import("@/views/index/index"),
  //       meta: {
  //         title: "首页",
  //         icon: "home",
  //         affix: true,
  //       },
  //     },
  //   ],
  // },
  {
    path: "/personalCenter",
    component: Layout,
    hidden: true,
    redirect: "personalCenter",
    children: [
      {
        path: "personalCenter",
        name: "PersonalCenter",
        component: () => import("@/views/personalCenter/index"),
        meta: {
          title: "个人中心",
        },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "index",
    name: "comprehensive",
    meta: {
      title: "综合概况",
      icon: "box-open",
    },
    children: [
      {
        path: "/",
        name: "statistics",
        component: () => import("@/views/comprehensive/statistics/statistics"),
        meta: {
          title: "统计分析",
          icon: "home",
          affix: true,
        },
      },
      {
        path: "/overview",
        name: "overview",
        component: () =>
          import("@/views/comprehensive/statistics/meishan_index"),
        meta: {
          title: "统计分析(眉山)",
          icon: "home",
        },
      },
    ],
  },
  {
    path: "/purchase",
    component: Layout,
    redirect: "noRedirect",
    name: "purchase",
    meta: {
      title: "采购验收",
      icon: "box-open",
    },
    children: [
      {
        path: "/purchasePlan",
        name: "purchasePlan",
        component: () => import("@/views/purchase/purchasePlan/purchasePlan"),
        meta: {
          title: "采购计划",
          icon: "home",
        },
      },
      {
        path: "/purchaseDetails",
        name: "purchaseDetails",
        component: () => import("@/views/purchase/purchasePlan/details"),
        meta: {
          title: "采购明细",
        },
        hidden: false,
      },
      {
        path: "/purchaseAdd",
        name: "purchaseAdd",
        component: () => import("@/views/purchase/purchaseAdd/purchaseAdd"),
        meta: {
          title: "增量入库台账",
          icon: "home",
        },
      },
      {
        path: "/purchaseSet",
        name: "purchaseSet",
        component: () => import("@/views/purchase/purchaseSet/purchaseSet"),
        meta: {
          title: "班组基本配置",
          icon: "home",
        },
      },
    ],
  },
  {
    path: "/check",
    component: Layout,
    redirect: "noRedirect",
    name: "check",
    meta: {
      title: "检验和试验",
      icon: "box-open",
    },
    children: [
      {
        path: "/checkAll",
        name: "checkAll",
        component: () => import("@/views/check/checkAll/checkAll"),
        meta: {
          title: "检验总览",
          icon: "home",
        },
      },
      {
        path: "/checkCycle",
        name: "checkCycle",
        component: () => import("@/views/check/checkAll/checkCycle"),
        hidden: true,
        meta: {
          title: "检验周期",
          icon: "home",
        },
      },
      {
        path: "/checkList",
        name: "checkList",
        component: () => import("@/views/check/checkList/checkList"),
        meta: {
          title: "检验台账",
          icon: "home",
        },
      },
      {
        path: "/checkMate",
        name: "checkMate",
        component: () => import("@/views/check/checkMate/checkMate"),
        hidden: true,
        meta: {
          title: "工器具检验记录",
          icon: "home",
        },
      },
      {
        path: "/checArchives",
        name: "checArchives",
        component: () => import("@/views/check/checkMate/checkArchives"),
        hidden: true,
        meta: {
          title: "工器具检验档案",
          icon: "home",
        },
      },
    ],
  },
  {
    path: "/use",
    component: Layout,
    redirect: "noRedirect",
    name: "use",
    meta: {
      title: "使用与保管",
      icon: "box-open",
    },
    children: [
      {
        path: "/useTrack",
        name: "useTrack",
        component: () => import("@/views/use/useTrack/useTrack"),
        meta: {
          title: "跟踪轨迹",
          icon: "home",
        },
      },
      {
        path: "/useList",
        name: "useList",
        component: () => import("@/views/use/useList/useList"),
        meta: {
          title: "领使用台账",
          icon: "home",
        },
      },
      {
        path: "/useDetails",
        name: "useDetails",
        hidden: true,
        component: () => import("@/views/use/useTrack/useDetails"),
        meta: {
          title: "使用记录",
          icon: "home",
        },
      },
    ],
  },
  {
    path: "/checkScrap",
    component: Layout,
    redirect: "noRedirect",
    name: "checkScrap",
    meta: {
      title: "检查和报废",
      icon: "box-open",
    },
    children: [
      {
        path: "/scrapApproval",
        name: "scrapApproval",
        component: () =>
          import("@/views/checkScrap/scrapApproval/scrapApproval"),
        meta: {
          title: "报废审批",
          icon: "home",
        },
      },
      {
        path: "/scrapList",
        name: "scrapList",
        component: () => import("@/views/checkScrap/scrapList/scrapList"),
        meta: {
          title: "报废台账",
          icon: "home",
        },
      },
      {
        path: "/verificationList",
        name: "verificationList",
        component: () =>
          import("@/views/checkScrap/verificationList/verificationList"),
        meta: {
          title: "检查台账",
          icon: "home",
        },
      },
      {
        path: "/scrapSelectDetails",
        name: "scrapSelectDetails",
        component: () => import("@/views/checkScrap/selectDetails"),
        hidden: true,
        meta: {
          title: "工器具档案",
          icon: "home",
        },
      },
    ],
  },
  /* {
    path: "/test",
    component: Layout,
    redirect: "noRedirect",
    children: [
      {
        path: "test",
        name: "Test",
        component: () => import("@/views/test/index"),
        meta: {
          title: "test",
          icon: "marker",
          permissions: ["admin"],
        },
      },
    ],
  }, */
  // permissions: ["admin"]
  {
    path: "/personManage",
    component: Layout,
    redirect: "noRedirect",
    name: "personManage",
    meta: { title: "系统管理", icon: "users-cog" },
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/personManage/user/user"),
        meta: { title: "用户管理" },
      },
      {
        path: "/permisson",
        name: "permisson",
        component: () => import("@/views/personManage/permisson/permisson"),
        meta: { title: "权限管理" },
      },
      {
        path: "/framework",
        name: "framework",
        component: () => import("@/views/personManage/framework/framework"),
        meta: { title: "组织架构管理" },
      },
    ],
  },
  {
    path: "/error",
    component: EmptyLayout,
    redirect: "noRedirect",
    name: "Error",
    hidden: true,
    meta: {
      title: "错误页",
      icon: "bug",
    },
    children: [
      {
        path: "401",
        name: "Error401",
        component: () => import("@/views/401"),
        meta: {
          title: "401",
        },
      },
      {
        path: "404",
        name: "Error404",
        component: () => import("@/views/404"),
        meta: {
          title: "404",
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;
