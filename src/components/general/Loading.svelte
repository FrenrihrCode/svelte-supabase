<script lang="ts">
  import { Spinner } from "sveltestrap";
  export let color: "primary" | "secondary" | "light" | "dark" = "primary";
</script>

<div class="loading">
  <Spinner {color} type="border" />
  <span>Cargando...</span>
</div>

<style>
  .loading {
    display: flex;
    flex-direction: column;
  }
</style>
