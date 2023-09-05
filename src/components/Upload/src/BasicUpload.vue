<template>
  <div class="w-full">
    <div class="upload">
      <div class="upload-card">
        <!--Image list-->
        <div
          class="upload-card-item"
          :style="getCSSProperties"
          v-for="(item, index) in imgList"
          :key="`img_${index}`"
        >
          <div class="upload-card-item-info">
            <div class="img-box">
              <img :src="item" />
            </div>
            <div class="img-box-actions">
              <n-icon size="18" class="mx-2 action-icon" @click="preview(item)">
                <EyeOutlined />
              </n-icon>
              <n-icon size="18" class="mx-2 action-icon" @click="remove(index)">
                <DeleteOutlined />
              </n-icon>
            </div>
          </div>
        </div>

        <!--Upload image-->
        <div
          class="upload-card-item upload-card-item-select-picture"
          :style="getCSSProperties"
          v-if="imgList.length < maxNumber"
        >
          <n-upload
            v-bind="$props"
            :file-list-style="{ display: 'none' }"
            @before-upload="beforeUpload"
            @finish="finish"
          >
            <div class="flex flex-col justify-center">
              <n-icon size="18" class="m-auto">
                <PlusOutlined />
              </n-icon>
              <span class="upload-title">Upload image</span>
            </div>
          </n-upload>
        </div>
      </div>
    </div>

    <!--Upload image-->
    <n-space>
      <n-alert title="Hint" type="info" v-if="helpText" class="flex w-full">
        {{ helpText }}
      </n-alert>
    </n-space>
  </div>

  <!--Preview image-->
  <n-modal
    v-model:show="showModal"
    preset="card"
    title="Preview"
    :bordered="false"
    :style="{ width: '520px' }"
  >
    <img :src="previewUrl" />
  </n-modal>
</template>

<script lang="ts">
  import { defineComponent, toRefs, reactive, computed, watch } from 'vue';
  import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@vicons/antd';
  import { basicProps } from './props';
  import { useMessage, useDialog } from 'naive-ui';
  import { ResultEnum } from '@/enums/httpEnum';
  import componentSetting from '@/settings/componentSetting';
  import { useGlobSetting } from '@/hooks/setting';
  import { isString } from '@/utils/is';

  const globSetting = useGlobSetting();

  export default defineComponent({
    name: 'BasicUpload',

    components: { EyeOutlined, DeleteOutlined, PlusOutlined },
    props: {
      ...basicProps,
    },
    emits: ['uploadChange', 'delete'],
    setup(props, { emit }) {
      const getCSSProperties = computed(() => {
        return {
          width: `${props.width}px`,
          height: `${props.height}px`,
        };
      });

      const message = useMessage();
      const dialog = useDialog();

      const state = reactive({
        showModal: false,
        previewUrl: '',
        originalImgList: [] as string[],
        imgList: [] as string[],
      });

      //Assign default image display
      watch(
        () => props.value,
        () => {
          state.imgList = props.value.map((item) => {
            return getImgUrl(item);
          });
        }
      );

      //Preview
      function preview(url: string) {
        state.showModal = true;
        state.previewUrl = url;
      }

      //Delete
      function remove(index: number) {
        dialog.info({
          title: 'Hint',
          content: 'Are you sure you want to delete？',
          positiveText: 'Confirm',
          negativeText: 'Cancel',
          onPositiveClick: () => {
            state.imgList.splice(index, 1);
            state.originalImgList.splice(index, 1);
            emit('uploadChange', state.originalImgList);
            emit('delete', state.originalImgList);
          },
          onNegativeClick: () => {},
        });
      }

      //Assemble the complete picture address
      function getImgUrl(url: string): string {
        const { imgUrl } = globSetting;
        return /(^http|https:\/\/)/g.test(url) ? url : `${imgUrl}${url}`;
      }

      function checkFileType(fileType: string) {
        return componentSetting.upload.fileType.includes(fileType);
      }

      //Before uploading
      function beforeUpload({ file }) {
        const fileInfo = file.file;
        const { maxSize, accept } = props;
        const acceptRef = (isString(accept) && accept.split(',')) || [];

        // Set the maximum value, then judge
        if (maxSize && fileInfo.size / 1024 / 1024 >= maxSize) {
          message.error(`The maximum upload file size cannot exceed ${maxSize}M`);
          return false;
        }

        // 设置类型,则判断
        const fileType = componentSetting.upload.fileType;
        if (acceptRef.length > 0 && !checkFileType(fileInfo.type)) {
          message.error(`Only upload files of type${fileType.join(',')}`);
          return false;
        }

        return true;
      }

      //Upload finished
      function finish({ event: Event }) {
        const res = eval('(' + Event.target.response + ')');
        const infoField = componentSetting.upload.apiSetting.infoField;
        const { code } = res;
        const message = res.msg || res.message || '上传失败';
        const result = res[infoField];
        //Success
        if (code === ResultEnum.SUCCESS) {
          let imgUrl: string = getImgUrl(result.photo);
          state.imgList.push(imgUrl);
          state.originalImgList.push(result.photo);
          emit('uploadChange', state.originalImgList);
        } else message.error(message);
      }

      return {
        ...toRefs(state),
        finish,
        preview,
        remove,
        beforeUpload,
        getCSSProperties,
      };
    },
  });
</script>

<style lang="less">
  .upload {
    width: 100%;
    overflow: hidden;

    &-card {
      width: auto;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      &-item {
        margin: 0 8px 8px 0;
        position: relative;
        padding: 8px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        &:hover {
          background: 0 0;

          .upload-card-item-info::before {
            opacity: 1;
          }

          &-info::before {
            opacity: 1;
          }
        }

        &-info {
          position: relative;
          height: 100%;
          padding: 0;
          overflow: hidden;

          &:hover {
            .img-box-actions {
              opacity: 1;
            }
          }

          &::before {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
            transition: all 0.3s;
            content: ' ';
          }

          .img-box {
            position: relative;
            //padding: 8px;
            //border: 1px solid #d9d9d9;
            border-radius: 2px;
          }

          .img-box-actions {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 10;
            white-space: nowrap;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:hover {
              background: 0 0;
            }

            .action-icon {
              color: rgba(255, 255, 255, 0.85);

              &:hover {
                cursor: pointer;
                color: #fff;
              }
            }
          }
        }
      }

      &-item-select-picture {
        border: 1px dashed #d9d9d9;
        border-radius: 2px;
        cursor: pointer;
        background: #fafafa;
        color: #666;

        .upload-title {
          color: #666;
        }
      }
    }
  }
</style>
