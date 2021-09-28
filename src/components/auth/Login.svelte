<script context="module">
  import { FormGroup, Input, Label, Spinner } from "sveltestrap";
  import { toasts } from "../../stores/toast.store";
  import { supabase } from "../../utils/supabaseConfig";
</script>

<script lang="ts">
  let loading = false;
  let email = "";
  let password = "";

  const handleLogin = async () => {
    try {
      loading = true;
      if (!email || !password) {
        toasts.warning(
          "Faltan datos",
          "Es necesario ingresar los campos del formulario"
        );
      } else {
        const { error } = await supabase.auth.signIn({ email, password });
        if (error) throw error;
      }
    } catch (error) {
      console.log(error);
      toasts.danger(
        "Credenciales incorrectas",
        "Las credenciales son erróneas!"
      );
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
  <button type="submit" class="btn btn-primary" disabled={loading}>
    {#if loading}
      <Spinner size="sm" />
    {/if}
    Ingresar
  </button>
</form>

<style>
</style>
