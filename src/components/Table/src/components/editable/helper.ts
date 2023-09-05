import { ComponentType } from '../../types/componentType';

/**
 * @description: Generate placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'NInput') return 'Please enter';
  if (
    ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(
      component
    )
  )
    return '请选择';
  return '';
}
