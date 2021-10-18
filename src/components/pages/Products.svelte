<script context="module">
  import { onMount } from "svelte";
  import { Column, Table, Button, Icon, Modal, ModalFooter } from "sveltestrap";
  import Loading from "../general/Loading.svelte";
  import {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
  } from "../../utils/product.db";
  import FormProduct from "../products/FormProduct.svelte";
  import { toasts } from "../../stores/toast.store";
</script>

<script lang="ts">
  import type {
    ICreateProduct,
    IProduct,
  } from "../../interfaces/product.interface";

  let loading = true;
  let isEditing = false;
  let open = false;
  let confirm = false;
  let products: IProduct[] = [];
  let selectedProduct: ICreateProduct = {
    name: "",
    description: "",
    category: "",
    available: true,
  };
  let idForDelete = -1;

  $: title = isEditing ? "Editar producto" : "Añadir nuevo producto";

  const toggle = () => (open = !open);
  const toggleConfirm = () => (confirm = !confirm);

  const openModal = (forEdit: boolean, product?: IProduct) => {
    selectedProduct = forEdit
      ? product
      : {
          name: "",
          description: "",
          category: "",
          available: true,
        };
    open = true;
    isEditing = forEdit;
  };
  const openConfirm = (id: number) => {
    idForDelete = id;
    confirm = true;
  };

  const handleSubmitForm = async (event: CustomEvent<ICreateProduct>) => {
    try {
      const { id, name, description, category, available } = event.detail;
      open = false;
      loading = true;
      if (isEditing) {
        await updateProduct({ id, name, description, category, available });
      } else {
        await createProduct({ name, description, category, available });
      }
      toasts.success(
        "Operación exitosa",
        `Tu producto has sido ${
          isEditing ? "actualizado" : "creado"
        } correctamente.`
      );
      products = await getProducts();
    } catch (error) {
      console.log(error);
      toasts.danger(
        "Ocurrió un error",
        "Ha ocurrido un error al ejecutar la operación, por favor intentelo más tarde."
      );
    } finally {
      loading = false;
    }
  };
  const handleDeleteProduct = async () => {
    try {
      loading = true;
      confirm = false;
      await deleteProduct(idForDelete);
      toasts.success(
        "Operación exitosa",
        "El producto ha sido eliminado correctamente de la base de datos."
      );
      products = await getProducts();
    } catch (error) {
      console.log(error);
      toasts.danger(
        "Ocurrió un error",
        "Ha ocurrido un error al ejecutar la operación, por favor intentelo más tarde."
      );
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    products = await getProducts();
    loading = false;
  });
</script>

<div>
  <div class="py-2 px-3 d-flex products-header">
    <h2>Listado de productos</h2>
    <Button on:click={() => openModal(false)}
      >Nuevo producto<Icon name="plus" /></Button
    >
  </div>
  <div class="px-3">
    {#if !loading}
      <Table rows={products} responsive let:row>
        <Column header="Nombre" width="8rem">
          {row.name}
        </Column>
        <Column header="Descripción" width="12rem">
          {row.description}
        </Column>
        <Column header="Categoría" width="4rem">
          {row.category}
        </Column>
        <Column header="Mostrar" width="2rem">
          {row.available ? "Sí" : "No"}
        </Column>
        <Column header="Imagen" width="5rem">
          {#if row.img}
            <img class="tiny-img shadow-sm" src={row.img} alt={row.name} />
          {:else}
            <Icon name="card-image" />
          {/if}
        </Column>
        <Column header="Acciones" width="2rem">
          <a href={`#/products/${row.id}`}>
            <Icon name="eye-fill" />
          </a>
          <button class="icon-btn" on:click={() => openModal(true, row)}>
            <Icon name="pencil-fill" />
          </button>
          <button class="icon-btn red" on:click={() => openConfirm(row.id)}>
            <Icon name="trash-fill" />
          </button>
        </Column>
      </Table>
    {:else}
      <Loading />
    {/if}
  </div>
  <Modal body header={title} centered isOpen={open} {toggle}>
    <FormProduct on:submit={handleSubmitForm} product={selectedProduct} />
  </Modal>
  <Modal
    body
    header="¿Estás seguro de eliminar este producto?"
    centered
    isOpen={confirm}
    toggle={toggleConfirm}
  >
    <p>
      De eliminar este producto ya no podrás recuperarlo, si no deseas esto solo
      actualiza la visibilidad del producto.
    </p>
    <ModalFooter>
      <Button color="danger" on:click={handleDeleteProduct}>Borrar</Button>
      <Button color="secondary" on:click={toggle}>Cancelar</Button>
    </ModalFooter>
  </Modal>
</div>

<style>
  .products-header {
    justify-content: space-between;
  }
  .icon-btn {
    padding: 0px;
    background-color: transparent;
    border: none;
    outline: none;
    color: rgb(245, 160, 10);
    margin-left: 10px;
  }
  .icon-btn:hover,
  .icon-btn:active {
    color: rgb(220, 120, 10);
  }
  .icon-btn.red {
    color: rgb(250, 2, 2);
  }
  .icon-btn.red:hover,
  .icon-btn.red:active {
    color: rgb(180, 2, 2);
  }
  .tiny-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    object-fit: cover;
  }
</style>
