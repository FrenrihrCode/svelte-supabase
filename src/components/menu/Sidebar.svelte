<script context="module">
  import { createEventDispatcher } from "svelte";
  import { ListGroup, ListGroupItem } from "sveltestrap";
  import { user } from "../../stores/session.store";
</script>

<script lang="ts">
  interface dispatcher {
    change: string;
  }
  const dispatch = createEventDispatcher<dispatcher>();
</script>

<div>
  <h4 class="text-center">ApplicationName</h4>
  <p>{$user.email}</p>
  <ListGroup flush>
    <ListGroupItem tag="button" action on:click={() => dispatch("change", "/")}
      >Inicio</ListGroupItem
    >
    <ListGroupItem
      tag="button"
      action
      on:click={() => dispatch("change", "/products")}>Productos</ListGroupItem
    >
    <ListGroupItem
      tag="button"
      action
      on:click={() => dispatch("change", "/categories")}
      >Categorías</ListGroupItem
    >
    <ListGroupItem tag="button" action>Ver mi perfil</ListGroupItem>
    <ListGroupItem color="danger" tag="button" action
      >Cerrar Sesión</ListGroupItem
    >
  </ListGroup>
</div>

<style>
</style>
