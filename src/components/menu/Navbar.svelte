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
  import { user } from "../../stores/session.store";
</script>

<script lang="ts">
  interface dispatcher {
    open: boolean;
    // change: "boards" | "products";
  }
  const dispatch = createEventDispatcher<dispatcher>();
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="#/" class="me-auto">ApplicationName</NavbarBrand>
  <NavbarToggler on:click={() => dispatch("open")} aria-label="Menú" />
  <Nav class="d-none d-md-flex ms-auto" navbar>
    <NavItem active>
      <NavLink href="#/boards">Tableros</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="#/products">Productos</NavLink>
    </NavItem>
    <Dropdown nav inNavbar>
      <DropdownToggle nav caret>{$user.email}</DropdownToggle>
      <DropdownMenu end>
        <DropdownItem>Ver mi perfil</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Cerrar sesión</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Nav>
</Navbar>

<style>
</style>
