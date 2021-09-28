<script context="module">
  import { Icon, TabContent, TabPane } from "sveltestrap";
  import Login from "./auth/Login.svelte";
  import Register from "./auth/Register.svelte";
</script>

<script lang="ts">
</script>

<div>
  <TabContent>
    <TabPane tabId="login" active>
      <span slot="tab">
        Iniciar Sesión <Icon name="person-fill" />
      </span>
      <div class="container pt-4">
        <h2 class="mb-2">Iniciar Sesión</h2>
        <Login />
      </div>
    </TabPane>
    <TabPane tabId="register">
      <span slot="tab">
        Registrarse <Icon name="person-badge-fill" />
      </span>
      <div class="container pt-4">
        <h2 class="mb-2">Registrarse</h2>
        <Register />
      </div>
    </TabPane>
  </TabContent>
</div>
<div />

<style>
  /* your styles go here */
</style>
