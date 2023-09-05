export default {
  table: {
    apiSetting: {
      // field name of the current page
      pageField: 'page',
      // Quantity per page field name
      sizeField: 'pageSize',
      // The name of the data field returned by the interface
      listField: 'list',
      // The interface returns the total page number field name
      totalField: 'pageCount',
    },
    //Default number of pagination
    defaultPageSize: 10,
    //Can switch the number of sets per page
    pageSizes: [10, 20, 30, 40, 50],
  },
  upload: {
    //Consider different interface specifications
    apiSetting: {
      // collection field name
      infoField: 'data',
      // Image address field name
      imgField: 'photo',
    },
    //Maximum upload image size
    maxSize: 2,
    //image upload type
    fileType: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg+xml'],
  },
};
