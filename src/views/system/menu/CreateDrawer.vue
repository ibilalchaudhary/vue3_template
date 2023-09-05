<template>
  <n-drawer v-model:show="isDrawer" :width="width" :placement="placement">
    <n-drawer-content :title="title" closable>
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="100"
      >
        <n-form-item label="type" path="type">
          <span>{{ formParams.type === 1 ? 'Sidebar menu' : '' }}</span>
        </n-form-item>
        <n-form-item label="title" path="label">
          <n-input placeholder="Please enter a title" v-model:value="formParams.label" />
        </n-form-item>
        <n-form-item label="subtitle" path="subtitle">
          <n-input placeholder="Please enter a subtitle" v-model:value="formParams.subtitle" />
        </n-form-item>
        <n-form-item label="path" path="path">
          <n-input placeholder="Please enter the path" v-model:value="formParams.path" />
        </n-form-item>
        <n-form-item label="Open Type" path="openType">
          <n-radio-group v-model:value="formParams.openType" name="openType">
            <n-space>
              <n-radio :value="1">Current window</n-radio>
              <n-radio :value="2">New window</n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item label="Menu authority" path="auth">
          <n-input placeholder="Please enter permissions, use multiple permissions, split" v-model:value="formParams.auth" />
        </n-form-item>
        <n-form-item label="hidden sidebar" path="hidden">
          <n-switch v-model:value="formParams.hidden" />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">Submit</n-button>
          <n-button @click="handleReset">Reset</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useMessage } from 'naive-ui';

  const rules = {
    label: {
      required: true,
      message: 'Please enter a title',
      trigger: 'blur',
    },
    path: {
      required: true,
      message: 'Please enter the path',
      trigger: 'blur',
    },
  };
  export default defineComponent({
    name: 'CreateDrawer',
    components: {},
    props: {
      title: {
        type: String,
        default: 'Add top-level menu',
      },
      width: {
        type: Number,
        default: 450,
      },
    },
    setup() {
      const message = useMessage();
      const formRef: any = ref(null);
      const defaultValueRef = () => ({
        label: '',
        type: 1,
        subtitle: '',
        openType: 1,
        auth: '',
        path: '',
        hidden: false,
      });

      const state = reactive({
        isDrawer: false,
        subLoading: false,
        formParams: defaultValueRef(),
        placement: 'right',
        alertText:
          'This function mainly previews various layout effects in real time. More complete configurations are set in projectSetting.ts. It is recommended to turn off this layout preview function in the production environment. ',
      });

      function openDrawer() {
        state.isDrawer = true;
      }

      function closeDrawer() {
        state.isDrawer = false;
      }

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('Added successfully');
            handleReset();
            closeDrawer();
          } else {
            message.error('Please fill in the complete information');
          }
        });
      }

      function handleReset() {
        formRef.value.restoreValidation();
        state.formParams = Object.assign(state.formParams, defaultValueRef());
      }

      return {
        ...toRefs(state),
        formRef,
        rules,
        formSubmit,
        handleReset,
        openDrawer,
        closeDrawer,
      };
    },
  });
</script>
