import { writable, derived } from "svelte/store";
import type { IToast, toastType } from "../interfaces/toast.interface";

const randomId = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};

export const _toasts = writable<IToast[]>([]);

const createToastStore = () => {
  const send = (
    title: string,
    message: string,
    timeout: number,
    type: toastType = "primary"
  ) => {
    _toasts.update((state) => {
      return [...state, { id: randomId(), title, type, message, timeout }];
    });
  };

  const toasts = derived(
    _toasts,
    ($_toasts, set) => {
      set($_toasts);
      if ($_toasts.length > 0) {
        const timer = setTimeout(() => {
          _toasts.update((state) => {
            state.shift();
            return state;
          });
        }, $_toasts[0].timeout);
        return () => {
          clearTimeout(timer);
        };
      }
    },
    [] as IToast[]
  );

  const { subscribe } = toasts;

  return {
    subscribe,
    default: (title: string, msg: string, timeout: number = 3000) =>
      send(title, msg, timeout),
    danger: (title: string, msg: string, timeout: number = 3000) =>
      send(title, msg, timeout, "danger"),
    warning: (title: string, msg: string, timeout: number = 3000) =>
      send(title, msg, timeout, "warning"),
    info: (title: string, msg: string, timeout: number = 3000) =>
      send(title, msg, timeout, "info"),
    success: (title: string, msg: string, timeout: number = 3000) =>
      send(title, msg, timeout, "success"),
  };
};

export const toasts = createToastStore();
