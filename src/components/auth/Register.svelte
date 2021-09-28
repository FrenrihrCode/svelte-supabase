<script context="module">
  import { FormGroup, Input, Label, Spinner } from "sveltestrap";
  import { supabase } from "../../utils/supabaseConfig";
  import { toasts } from "../../stores/toast.store";
</script>

<script lang="ts">
  let loading = false;
  let email = "";
  let password = "";

  const handleRegister = async () => {
    try {
      loading = true;
      if (!email || !password) {
        toasts.warning(
          "Faltan datos",
          "Es necesario ingresar los campos del formulario"
        );
      } else {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toasts.warning(
          "Registro completado",
          "Gracias por registrarte, revisa tu email para confirmar tu registro!"
        );
      }
    } catch (error) {
      console.log(error);
      const msg = error.error_description || error.message;
      toasts.danger("Ocurrió un error", msg);
    } finally {
      loading = false;
    }
  };
</script>

<form on:submit|preventDefault={handleRegister}>
  <FormGroup>
    <Label for="inputEmailR">Correo</Label>
    <Input
      type="email"
      name="email"
      id="inputEmailR"
      placeholder="Ingresar correo"
      bind:value={email}
    />
  </FormGroup>
  <FormGroup>
    <Label for="inputPasswordR">Contraseña</Label>
    <Input
      type="password"
      name="password"
      id="inputPasswordR"
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
