<script context="module">
  import { onMount } from "svelte";
  import { Icon, Button } from "sveltestrap";
  import { getProductById, updateProduct } from "../../utils/product.db";
  import { toasts } from "../../stores/toast.store";
</script>

<script lang="ts">
  import type { IProduct } from "../../interfaces/product.interface";
  export let params: Record<string, string> = {};
  let product: IProduct;
  let loading = true;

  const handleUpdateProduct = async (img: string) => {
    const result = await updateProduct({ id: product.id, img });
    if (result && result.length > 0) {
      console.log(result);
      toasts.success(
        "Imagen subida con éxito",
        "La imagen de tu producto acaba de actualizarce correctamente"
      );
      product = result[0];
    }
  };

  const openUploadWidget = () => {
    const cloudinary = window["cloudinary"];
    if (cloudinary) {
      cloudinary.openUploadWidget(
        {
          cloudName: "de2lf4pvs",
          uploadPreset: "beauqknw",
          language: "es",
          sources: ["facebook", "google_drive", "local", "camera"],
          showAdvancedOptions: false,
          multiple: false,
          defaultSource: "local",
          maxFileSize: 3500000,
          resourceType: "image",
          folder: "store",
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#0078FF",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#0078FF",
              action: "#FF620C",
              inactiveTabIcon: "#0E2F5A",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#E4EBF1",
            },
          },
        },
        (err, result) => {
          if (err) {
            toasts.danger(
              "Ocurrió un error!",
              "No se puede encontrar el servicio de Cloudinary, por favor intentelo más tarde o contacte con el desarrollador."
            );
          }
          if (!err && result.event === "success") {
            handleUpdateProduct(result.info.secure_url);
          }
        }
      );
    } else {
      toasts.danger(
        "Ocurrió un error!",
        "No se puede encontrar el servicio de Cloudinary, por favor intentelo más tarde o contacte con el desarrollador."
      );
    }
  };

  onMount(async () => {
    product = await getProductById(params.id);
    loading = false;
  });
</script>

<svelte:head>
  <script
    src="https://upload-widget.cloudinary.com/global/all.js"
    type="text/javascript"></script>
</svelte:head>

<div class="product p-4">
  <a
    class="product-back"
    href="#/products"
    color="secondary"
    title="Regresar a productos"
  >
    <Icon name="arrow-left-circle-fill" />
  </a>
  {#if loading}
    <p>Cargando...</p>
  {:else}
    <div class="card">
      <div class="row g-0">
        {#if product.img}
          <div class="col img-col">
            <img
              src={product.img}
              class="img-fluid rounded shadow"
              alt={product.name}
            />
          </div>
        {/if}
        <div class="col ps-2">
          <div class="card-body">
            <h1 class="card-title">{product.name}</h1>
            <p class="card-text mb-2">
              <small class="text-muted">{product.category}</small>
            </p>
            <p class="card-text">
              {product.description}
            </p>
            <Button on:click={openUploadWidget} color="secondary" outline
              >Subir imágen</Button
            >
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .product {
    position: relative;
  }
  .product-back {
    font-size: 3rem;
    position: absolute;
    top: 0;
    left: 1rem;
    z-index: 1;
  }
  .img-col {
    width: 100%;
    max-width: 540px;
  }
  .img-col img {
    width: 100%;
  }
</style>
