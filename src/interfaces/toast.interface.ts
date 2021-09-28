export type toastType = "primary" | "success" | "danger" | "warning" | "info";

export interface Toast {
  id: string;
  type: toastType;
  title: string;
  message: string;
  timeout: number;
}
