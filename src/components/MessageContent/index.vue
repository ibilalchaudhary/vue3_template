<template></template>
<script lang="ts">
  import { useMessage } from 'naive-ui';

  export default {
    name: 'MessageContent',
    setup() {
      //Mount on window for convenience and use in js
      window['$message'] = useMessage();
    },
  };
</script>
