<script context="module">
  import { createEventDispatcher } from "svelte";
  import { ListGroup, ListGroupItem } from "sveltestrap";
</script>

<script lang="ts">
  interface dispatcher {
    change: "boards" | "products";
  }
  const dispatch = createEventDispatcher<dispatcher>();
</script>

<div>
  <h4 class="text-center">ApplicationName</h4>
  <ListGroup flush>
    <ListGroupItem
      tag="button"
      action
      on:click={() => dispatch("change", "boards")}>Tableros</ListGroupItem
    >
    <ListGroupItem
      tag="button"
      action
      on:click={() => dispatch("change", "products")}>Productos</ListGroupItem
    >
    <ListGroupItem tag="button" action>Ver mi perfil</ListGroupItem>
    <ListGroupItem color="danger" tag="button" action
      >Cerrar Sesión</ListGroupItem
    >
  </ListGroup>
</div>

<style>
</style>
