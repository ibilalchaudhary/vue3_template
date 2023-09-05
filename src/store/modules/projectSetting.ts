import { defineStore } from 'pinia';
import { store } from '@/store';
import projectSetting from '@/settings/projectSetting';
import type { IheaderSetting, ImenuSetting, ImultiTabsSetting, IcrumbsSetting } from '/#/config';

const {
  navMode,
  navTheme,
  isMobile,
  headerSetting,
  showFooter,
  menuSetting,
  multiTabsSetting,
  crumbsSetting,
  permissionMode,
  isPageAnimate,
  pageAnimateType,
} = projectSetting;

interface ProjectSettingState {
  navMode: string; //navigation mode
  navTheme: string; //Navigation style
  headerSetting: IheaderSetting; //Top setting
  showFooter: boolean; //footer
  menuSetting: ImenuSetting; //Multiple labels
  multiTabsSetting: ImultiTabsSetting; //Multiple tabs
  crumbsSetting: IcrumbsSetting; //Breadcrumbs
  permissionMode: string; //Permission mode
  isPageAnimate: boolean; //Whether to enable routing animation
  pageAnimateType: string; //Route animation type
  isMobile: boolean; // Whether it is in mobile mode
}

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: (): ProjectSettingState => ({
    navMode: navMode,
    navTheme,
    isMobile,
    headerSetting,
    showFooter,
    menuSetting,
    multiTabsSetting,
    crumbsSetting,
    permissionMode,
    isPageAnimate,
    pageAnimateType,
  }),
  getters: {
    getNavMode(): string {
      return this.navMode;
    },
    getNavTheme(): string {
      return this.navTheme;
    },
    getIsMobile(): boolean {
      return this.isMobile;
    },
    getHeaderSetting(): object {
      return this.headerSetting;
    },
    getShowFooter(): boolean {
      return this.showFooter;
    },
    getMenuSetting(): object {
      return this.menuSetting;
    },
    getMultiTabsSetting(): object {
      return this.multiTabsSetting;
    },
    getCrumbsSetting(): object {
      return this.multiTabsSetting;
    },
    getPermissionMode(): string {
      return this.permissionMode;
    },
    getIsPageAnimate(): boolean {
      return this.isPageAnimate;
    },
    getPageAnimateType(): string {
      return this.pageAnimateType;
    },
  },
  actions: {
    setNavTheme(value: string): void {
      this.navTheme = value;
    },
    setIsMobile(value: boolean): void {
      this.isMobile = value;
    },
  },
});

// Need to be used outside the setup
export function useProjectSettingStoreWithOut() {
  return useProjectSettingStore(store);
}
