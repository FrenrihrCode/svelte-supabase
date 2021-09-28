<script context="module">
  import { supabase } from "../../utils/supabaseConfig";
</script>

<script lang="ts">
  let loading = false;
  let email = "";
  let password = "";

  const handleRegister = async () => {
    try {
      loading = true;
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert(data["message"]);
    } catch (error) {
      console.log(error);
      alert(error.error_description || error.message);
    } finally {
      loading = false;
    }
  };
</script>

<form on:submit|preventDefault={handleRegister}>
  <div class="col-6 form-widget">
    <h1 class="header">Supabase + Svelte</h1>
    <div>
      <input
        class="inputField"
        type="email"
        placeholder="Your email"
        bind:value={email}
      />
      <input
        class="inputField"
        type="password"
        placeholder="Your password"
        bind:value={password}
      />
    </div>
    <div>
      <input
        type="submit"
        class="button block"
        value={loading ? "Loading" : "Send magic link"}
        disabled={loading}
      />
    </div>
  </div>
</form>

<style>
</style>
