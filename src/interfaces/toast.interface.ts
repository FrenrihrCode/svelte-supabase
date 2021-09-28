export type toastType = "primary" | "success" | "danger" | "warning" | "info";

export interface IToast {
  id: string;
  type: toastType;
  title: string;
  message: string;
  timeout: number;
}
