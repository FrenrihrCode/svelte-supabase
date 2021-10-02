<script context="module">
  import { Offcanvas } from "sveltestrap";
  import Boards from "./Boards.svelte";
  import Products from "./Products.svelte";
  import Navbar from "./menu/Navbar.svelte";
  import Sidebar from "./menu/Sidebar.svelte";
</script>

<script lang="ts">
  let open = false;
  const toggleSidebar = () => (open = !open);
  const components = {
    boards: Boards,
    products: Products,
  };
  let selected: "boards" | "products" = "boards";
  const changeView = (event: CustomEvent<"boards" | "products">) => {
    selected = event.detail;
    if (open) {
      open = !open;
    }
  };
</script>

<Navbar on:open={toggleSidebar} on:change={changeView} />
<svelte:component this={components[selected]} />
<Offcanvas scroll isOpen={open} toggle={toggleSidebar}>
  <Sidebar on:change={changeView} />
</Offcanvas>

<style>
</style>
