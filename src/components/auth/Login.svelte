<script context="module">
  import { FormGroup, Input, Label } from "sveltestrap";
  import { supabase } from "../../utils/supabaseConfig";
</script>

<script lang="ts">
  let loading = false;
  let email = "";
  let password = "";

  const handleLogin = async () => {
    try {
      loading = true;
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
    } catch (error) {
      console.log(error);
      alert(error.error_description || error.message);
    } finally {
      loading = false;
    }
  };
</script>

<form on:submit|preventDefault={handleLogin}>
  <FormGroup>
    <Label for="inputEmail">Correo</Label>
    <Input
      type="email"
      name="email"
      id="inputEmail"
      placeholder="Ingresar correo"
      bind:value={email}
    />
  </FormGroup>
  <FormGroup>
    <Label for="inputPassword">Contraseña</Label>
    <Input
      type="password"
      name="password"
      id="inputPassword"
      placeholder="Ingresar contraseña"
      bind:value={password}
    />
  </FormGroup>
</form>

<style>
</style>
