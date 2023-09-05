import { defineStore } from 'pinia';
import { RouteLocationNormalized } from 'vue-router';

// routes that don't need to appear in the tab
const whiteList = ['Redirect', 'login'];

export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  path: string;
  name: string;
  hash: string;
  meta: object;
  params: object;
  query: object;
};

export type ITabsViewState = {
  tabsList: RouteItem[]; // Tabs
};

// keep fixed route
function retainAffixRoute(list: any[]) {
  return list.filter((item) => item?.meta?.affix ?? false);
}

export const useTabsViewStore = defineStore({
  id: 'app-tabs-view',
  state: (): ITabsViewState => ({
    tabsList: [],
  }),
  getters: {},
  actions: {
    initTabs(routes) {
      // initialize the tab page
      this.tabsList = routes;
    },
    addTabs(route): boolean {
      // add tab
      if (whiteList.includes(route.name)) return false;
      const isExists = this.tabsList.some((item) => item.fullPath == route.fullPath);
      if (!isExists) {
        this.tabsList.push(route);
      }
      return true;
    },
    closeLeftTabs(route) {
      // close the left
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList = this.tabsList.filter((item, i) => i >= index || (item?.meta?.affix ?? false));
    },
    closeRightTabs(route) {
      // close the right
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList = this.tabsList.filter((item, i) => i <= index || (item?.meta?.affix ?? false));
    },
    closeOtherTabs(route) {
      // close other
      this.tabsList = this.tabsList.filter((item) => item.fullPath == route.fullPath || (item?.meta?.affix ?? false));
    },
    closeCurrentTab(route) {
      // close the current page
      const index = this.tabsList.findIndex((item) => item.fullPath == route.fullPath);
      this.tabsList.splice(index, 1);
    },
    closeAllTabs() {
      // close all
      console.log(retainAffixRoute(this.tabsList));
      this.tabsList = retainAffixRoute(this.tabsList);
    },
  },
});
