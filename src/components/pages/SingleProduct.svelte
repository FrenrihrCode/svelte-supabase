<script context="module">
  import { onMount } from "svelte";
  import { Icon } from "sveltestrap";
  import { getProductById } from "../../utils/product.db";
</script>

<script lang="ts">
  import type { IProduct } from "../../interfaces/product.interface";
  export let params: Record<string, string> = {};
  let product: IProduct;
  let loading = true;
  onMount(async () => {
    product = await getProductById(params.id);
    loading = false;
  });
</script>

<div>
  {#if loading}
    <p>Cargando...</p>
  {:else}
    <div>
      <div>
        <div>
          <Icon name={product.available ? "bookmark-fill" : "bookmark"} />
          <h1>{product.name}</h1>
        </div>
        <h4>{product.category}</h4>
        <p>{product.description}</p>
      </div>
      <div>
        
      </div>
    </div>
  {/if}
</div>

<style>
</style>
