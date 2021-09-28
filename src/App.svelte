<script context="module">
  import Auth from "./components/Auth.svelte";
  import Profile from "./components/Profile.svelte";
  import Toast from "./shared/Toast.svelte";
  import { user } from "./stores/session.store";
  import { supabase } from "./utils/supabaseConfig";
</script>

<script lang="ts">
  user.set(supabase.auth.user());

  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN") {
      user.set(session.user);
    } else {
      user.set(null);
    }
  });
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
  />
</svelte:head>

<main>
  {#if $user}
    <Profile />
  {:else}
    <Auth />
  {/if}
  <Toast />
</main>

<style>
</style>
