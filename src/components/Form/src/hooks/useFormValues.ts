import { isArray, isFunction, isObject, isString, isNullOrUnDef } from '@/utils/is';
import { unref } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import type { FormSchema } from '../types/form';
import { set } from 'lodash-es';

interface UseFormValuesContext {
  defaultFormModel: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
}
export function useFormValues({ defaultFormModel, getSchema, formModel }: UseFormValuesContext) {
  // Processing form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(values)) {
      let [, value] = item;
      const [key] = item;
      if (
        !key ||
        (isArray(value) && value.length === 0) ||
        isFunction(value) ||
        isNullOrUnDef(value)
      ) {
        continue;
      }
      // Remove Spaces
      if (isString(value)) {
        value = value.trim();
      }
      set(res, key, value);
    }
    return res;
  }

  //Initialize default values
  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    schemas.forEach((item) => {
      const { defaultValue } = item;
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;
        formModel[item.field] = defaultValue;
      }
    });
    defaultFormModel.value = obj;
  }

  return { handleFormValues, initDefault };
}
