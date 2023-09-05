export interface ProjectSettingState {
  //navigation mode
  navMode: string;
  //navigation style
  navTheme: string;
  // top settings
  headerSetting: object;
  //footer
  showFooter: boolean;
  //Menu Settings
  menuSetting: object;
  //Multiple tags
  multiTabsSetting: object;
  //Bread crumbs
  crumbsSetting: object;
  // permission mode
  permissionMode: string;
}

export interface IbodySetting {
  fixed: boolean;
}

export interface IheaderSetting {
  bgColor: string;
  fixed: boolean;
  isReload: boolean;
}

export interface ImenuSetting {
  minMenuWidth: number;
  menuWidth: number;
  fixed: boolean;
  mixMenu: boolean;
  collapsed: boolean;
  mobileWidth: number;
}

export interface IcrumbsSetting {
  show: boolean;
  showIcon: boolean;
}

export interface ImultiTabsSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
}
export interface GlobConfig {
  title: string;
  apiUrl: string;
  shortName: string;
  urlPrefix?: string;
  uploadUrl?: string;
  prodMock: boolean;
  imgUrl?: string;
}

export interface GlobEnvConfig {
  // title
  VITE_GLOB_APP_TITLE: string;
  // interface address
  VITE_GLOB_API_URL: string;
  // interface prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // image upload address
  VITE_GLOB_UPLOAD_URL?: string;
  //image prefix address
  VITE_GLOB_IMG_URL?: string;
  //Enable mock in production environment
  VITE_GLOB_PROD_MOCK: boolean;
}
