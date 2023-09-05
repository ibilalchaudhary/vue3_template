import type { PropType } from 'vue';
import { NUpload } from 'naive-ui';

export const basicProps = {
  ...NUpload.props,
  accept: {
    type: String,
    default: '.jpg,.png,.jpeg,.svg,.gif',
  },
  helpText: {
    type: String as PropType<string>,
    default: '',
  },
  maxSize: {
    type: Number as PropType<number>,
    default: 2,
  },
  maxNumber: {
    type: Number as PropType<number>,
    default: Infinity,
  },
  value: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  width: {
    type: Number as PropType<number>,
    default: 104,
  },
  height: {
    type: Number as PropType<number>,
    default: 104, //It is recommended not to be smaller than this size. Too small pages may display abnormally
  },
};
