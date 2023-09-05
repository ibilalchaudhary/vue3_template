import type { CSSProperties, PropType } from 'vue';
import { FormSchema } from './types/form';
import type { GridProps, GridItemProps } from 'naive-ui/lib/grid';
import type { ButtonProps } from 'naive-ui/lib/button';
import { propTypes } from '@/utils/propTypes';
export const basicProps = {
  // Label width Fixed width
  labelWidth: {
    type: [Number, String] as PropType<number | string>,
    default: 80,
  },
  // form configuration rules
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  // layout method
  layout: {
    type: String,
    default: 'inline',
  },
  // Whether to display as an inline form
  inline: {
    type: Boolean,
    default: false,
  },
  //size
  size: {
    type: String,
    default: 'medium',
  },
  // label position
  labelPlacement: {
    type: String,
    default: 'left',
  },
  //Whether the component width is 100%
  isFull: {
    type: Boolean,
    default: true,
  },
  //whether to display the action button (query/reset)
  showActionButtonGroup: propTypes.bool.def(true),
  // show the reset button
  showResetButton: propTypes.bool.def(true),
  // reset button configuration
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // show the confirm button
  showSubmitButton: propTypes.bool.def(true),
  // Confirm button configuration
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  //Expand Collapse button
  showAdvancedButton: propTypes.bool.def(true),
  // confirm button text
  submitButtonText: {
    type: String,
    default: 'query',
  },
  // reset button text
  resetButtonText: {
    type: String,
    default: 'reset',
  },
  //grid configuration
  gridProps: Object as PropType<GridProps>,
  //gi configuration
  giProps: Object as PropType<GridItemProps>,
  //grid style
  baseGridStyle: {
    type: Object as PropType<CSSProperties>,
  },
  //Whether to fold
  collapsed: {
    type: Boolean,
    default: false,
  },
  // default number of rows to display
  collapsedRows: {
    type: Number,
    default: 1,
  },
};
