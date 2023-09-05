import { ComponentType } from './types/index';

/**
 * @description: Generate Place Holder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'NInput') return 'Please Enter';
  if (
    ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(
      component
    )
  )
    return 'Please Choose';
  return '';
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];

function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}

/**
 * Time Field
 */
export const dateItemType = genType();

export function defaultType(component) {
  if (component === 'NInput') return '';
  if (component === 'NInputNumber') return null;
  return [
    'NPicker',
    'NSelect',
    'NCheckbox',
    'NRadio',
    'NSwitch',
    'NDatePicker',
    'NTimePicker',
  ].includes(component)
    ? ''
    : undefined;
}
