<script context="module">
  import { Offcanvas } from "sveltestrap";
  import Navbar from "./menu/Navbar.svelte";
  import Sidebar from "./menu/Sidebar.svelte";
  import Router, { push } from "svelte-spa-router";
  import { routes } from "./pages/routes";
</script>

<script lang="ts">
  let open = false;
  const toggleSidebar = () => (open = !open);
  const changeView = (event: CustomEvent<string>) => {
    const path = event.detail;
    push(path);
    if (open) {
      open = !open;
    }
  };
</script>

<Navbar on:open={toggleSidebar} />
<Router {routes} />
<Offcanvas scroll isOpen={open} toggle={toggleSidebar}>
  <Sidebar on:change={changeView} />
</Offcanvas>

<style>
</style>
