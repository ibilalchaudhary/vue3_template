<template>
  <div></div>
</template>
<script lang="ts">
  import { useLoadingBar } from 'naive-ui';

  export default {
    name: 'LoadingContent',
    setup() {
      //Mount on window for convenience and use in js
      window['$loading'] = useLoadingBar();
    },
  };
</script>
