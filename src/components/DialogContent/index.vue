<template></template>
<script lang="ts">
  import { useDialog } from 'naive-ui';

  export default {
    name: 'DialogContent',
    setup() {
      //Mount on window for convenience and use in js
      window['$dialog'] = useDialog();
    },
  };
</script>
