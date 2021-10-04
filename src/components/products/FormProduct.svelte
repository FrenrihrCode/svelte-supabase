<script context="module">
  import { createEventDispatcher } from "svelte";
  import { FormGroup, Input, Label, Button } from "sveltestrap";
  import Switch from "../forms/Switch.svelte";
</script>

<script lang="ts">
  import type { ICreateProduct } from "../../interfaces/product.interface";
  export let product: ICreateProduct;

  const dispatch = createEventDispatcher<{ submit: ICreateProduct }>();
</script>

<form on:submit|preventDefault={() => dispatch("submit", product)}>
  <div class="row">
    <div class="col-12">
      <FormGroup>
        <Label for="nameInput">Nombre</Label>
        <Input
          type="text"
          name="name"
          id="nameInput"
          bind:value={product.name}
          placeholder="Nombre del producto"
        />
      </FormGroup>
    </div>
    <div class="col-12">
      <FormGroup>
        <Label for="descInput">Descripción</Label>
        <Input
          type="text"
          name="desc"
          id="descInput"
          bind:value={product.description}
          placeholder="Descripción del producto"
        />
      </FormGroup>
    </div>
    <div class="col-6">
      <FormGroup>
        <Label for="catInput">Categoría</Label>
        <Input
          type="text"
          name="cat"
          id="catInput"
          bind:value={product.category}
          placeholder="Categoría del producto"
        />
      </FormGroup>
    </div>
    <div class="col-6">
      <p class="mb-2">Producto disponible:</p>
      <Switch bind:checked={product.available} />
    </div>
    <div class="col-12">
      <Button class="w-100" color="primary" type="submit">ACEPTAR</Button>
    </div>
  </div>
</form>

<style>
</style>
