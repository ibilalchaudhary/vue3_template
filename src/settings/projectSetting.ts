const setting = {
  //navigation mode vertical left menu mode horizontal top menu mode
  navMode: 'vertical',
  //Navigation style dark dark sidebar light white sidebar header-dark dark top bar
  navTheme: 'dark',
  // Whether it is in mobile mode
  isMobile: false,
  //top
  headerSetting: {
    //background color
    bgColor: '#fff',
    //fix the top
    fixed: true,
    // show the reload button
    isReload: true,
  },
  //footer
  showFooter: true,
  //Multiple tags
  multiTabsSetting: {
    //background color
    bgColor: '#fff',
    //whether to display
    show: true,
    //fixed multi-tab
    fixed: true,
  },
  //menu
  menuSetting: {
    //minimum width
    minMenuWidth: 64,
    //menu width
    menuWidth: 200,
    //fixed menu
    fixed: true,
    // split menu
    mixMenu: false,
    //Trigger the width of the mobile sidebar
    mobileWidth: 800,
    // collapse the menu
    collapsed: false,
  },
  //Bread crumbs
  crumbsSetting: {
    //whether to display
    show: true,
    //display icon
    showIcon: false,
  },
  //Menu permission mode FIXED Front-end fixed routing BACK dynamically obtained
  permissionMode: 'FIXED',
  //Whether to enable routing animation
  isPageAnimate: true,
  //Route animation type
  pageAnimateType: 'zoom-fade',
};
export default setting;
