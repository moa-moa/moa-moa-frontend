export type ToastTypes = 'success' | 'error';

export interface IToast {
  id: string;
  type: ToastTypes;
  message: string;
}
