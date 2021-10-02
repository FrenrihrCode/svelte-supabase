<script context="module">
  import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "sveltestrap";
  import { createEventDispatcher } from "svelte";
</script>

<script lang="ts">
  interface dispatcher {
    open: boolean;
    change: "boards" | "products";
  }
  const dispatch = createEventDispatcher<dispatcher>();
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/" class="me-auto">ApplicationName</NavbarBrand>
  <NavbarToggler on:click={() => dispatch("open")} aria-label="Menú" />
  <Nav class="d-none d-md-flex ms-auto" navbar>
    <Dropdown nav inNavbar>
      <DropdownToggle nav caret>UserName</DropdownToggle>
      <DropdownMenu end>
        <DropdownItem>Ver mi perfil</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Cerrar sesión</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <NavItem>
      <NavLink on:click={() => dispatch("change", "boards")}>Tableros</NavLink>
    </NavItem>
    <NavItem>
      <NavLink on:click={() => dispatch("change", "products")}
        >Productos</NavLink
      >
    </NavItem>
  </Nav>
</Navbar>

<style>
</style>
