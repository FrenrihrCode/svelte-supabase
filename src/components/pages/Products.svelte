<script context="module">
  import { onMount } from "svelte";
  import { Column, Table, Button, Icon, Modal } from "sveltestrap";
  import Loading from "../general/Loading.svelte";
  import { createProduct, getProducts } from "../../utils/product.db";
  import FormProduct from "../products/FormProduct.svelte";
</script>

<script lang="ts">
  import type {
    ICreateProduct,
    IProduct,
  } from "../../interfaces/product.interface";

  let loading = true;
  let isEditing = false;
  let open = false;
  let products: IProduct[] = [];
  let selectedProduct: ICreateProduct = {
    name: "",
    description: "",
    category: "",
    available: true,
  };

  $: title = isEditing ? "Editar producto" : "Añadir nuevo producto";

  const toggle = () => (open = !open);
  const openModal = () => {
    selectedProduct = {
      name: "",
      description: "",
      category: "",
      available: true,
    };
    open = true;
    isEditing = false;
  };
  const handleSubmitForm = async (event: CustomEvent<ICreateProduct>) => {
    const product = event.detail;
    open = false;
    loading = true;
    const res = await createProduct(product);
    console.log(res);
    products = await getProducts();
    loading = false;
  };

  onMount(async () => {
    products = await getProducts();
    loading = false;
  });
</script>

<div>
  <div class="py-2 px-3 d-flex products-header">
    <h2>Listado de productos</h2>
    <Button on:click={openModal}>Nuevo producto<Icon name="plus" /></Button>
  </div>
  <div class="px-3">
    {#if !loading}
      <Table hover rows={products} let:row>
        <Column header="Nombre" width="5rem">
          {row.name}
        </Column>
        <Column header="Descripción" width="10rem">
          {row.description}
        </Column>
        <Column header="Categoría" width="4rem">
          {row.category}
        </Column>
        <Column header="Mostrar" width="2rem">
          {row.available ? "Sí" : "No"}
        </Column>
        <Column header="Imagen" width="10rem">
          {row.img}
        </Column>
        <Column header="Acciones" width="2rem">
          <a href={`#/products/${row.id}`}>
            <Icon name="eye-fill" />
          </a>
        </Column>
      </Table>
    {:else}
      <Loading />
    {/if}
  </div>
  <Modal body header={title} centered isOpen={open} {toggle}>
    <FormProduct on:submit={handleSubmitForm} product={selectedProduct} />
  </Modal>
</div>

<style>
  .products-header {
    justify-content: space-between;
  }
</style>
