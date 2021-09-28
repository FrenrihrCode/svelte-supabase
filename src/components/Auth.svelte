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
      <Login />
    </TabPane>
    <TabPane tabId="register">
      <span slot="tab">
        Registrarse <Icon name="person-badge-fill" />
      </span>
      <Register />
    </TabPane>
  </TabContent>
</div>
<div />

<style>
  /* your styles go here */
</style>
