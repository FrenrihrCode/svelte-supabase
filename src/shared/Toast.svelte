<script context="module">
  import { Toast, ToastBody, ToastHeader } from "sveltestrap";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { toasts } from "../stores/toast.store";
</script>

<script lang="ts">
</script>

<div class="custom-toasts">
  {#each $toasts as toast (toast.id)}
    <div animate:flip class="bg-{toast.type} mb-2" transition:fly={{ y: 30 }}>
      <Toast>
        <ToastHeader>{toast.title}</ToastHeader>
        <ToastBody>{toast.message}</ToastBody>
      </Toast>
    </div>
  {/each}
</div>

<style>
  .custom-toasts {
    position: fixed;
    top: 20px;
    right: 20px;
    margin: 0 auto;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    pointer-events: none;
  }
</style>
