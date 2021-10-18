<script context="module">
  import { onMount } from "svelte";
  import { Table } from "sveltestrap";
  import { getCategories } from "../../utils/cateogry.db";
  import Loading from "../general/Loading.svelte";
</script>

<script lang="ts">
  import type { ICategory } from "../../interfaces/category.interface";

  let loading = true;
  let categories: ICategory[] = [];

  onMount(async () => {
    categories = await getCategories();
    loading = false;
  });
</script>

<div>
  <h1>Lista de categorías</h1>
  {#if loading}
    <Loading />
  {:else}
    <Table rows={categories} />
  {/if}
</div>

<style>
</style>
