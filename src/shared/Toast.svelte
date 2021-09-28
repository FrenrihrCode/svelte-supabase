<script context="module">
  import { Toast, ToastBody, ToastHeader } from "sveltestrap";
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { _toasts } from "../stores/toast.store";
</script>

<script lang="ts">
</script>

<div class="custom-toasts">
  {#each $_toasts as toast (toast.id)}
    <div animate:flip class="bg-{toast.type}" transition:fly={{ y: 30 }}>
      <Toast class="me-1">
        <ToastHeader>{toast.title}</ToastHeader>
        <ToastBody>{toast.message}</ToastBody>
      </Toast>
    </div>
  {/each}
</div>

<style>
  .custom-toasts {
    position: fixed;
    top: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;
  }
</style>
