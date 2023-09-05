import { NButton } from 'naive-ui';
import type { Component } from 'vue';
import { PermissionsEnum } from '@/enums/permissionsEnum';
export interface ActionItem extends Partial<InstanceType<typeof NButton>> {
  onClick?: Fn;
  label?: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'primary' | 'default';
  // After setting color, it will override the style of type
  color?: string;
  icon?: Component;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // Whether the permission code control is displayed
  auth?: PermissionsEnum | PermissionsEnum[] | string | string[];
  // Whether the business control is displayed
  ifShow?: boolean | ((action: ActionItem) => boolean);
}

export interface PopConfirm {
  title: string;
  okText?: string;
  cancelText?: string;
  confirm: Fn;
  cancel?: Fn;
  icon?: Component;
}
