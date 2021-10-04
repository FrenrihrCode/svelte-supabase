<script lang="ts">
  import { onMount } from "svelte";
  import { user } from "../../stores/session.store";
  import { supabase } from "../../utils/supabaseConfig";

  let loading = true;
  let username = null;
  let website = null;
  let avatar_url = null;

  async function getProfile() {
    try {
      loading = true;
      const user = supabase.auth.user();
      let { error, data, status } = await supabase
        .from("profiles")
        .select("username, website, avatar_url")
        .eq("id", user.id)
        .single();
      if (error && status !== 406) throw error;
      if (data) {
        username = data.username;
        website = data.website;
        avatar_url = data.avatar_url;
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
    }
  }

  async function updateProfile() {
    console.log("actualizar");
  }

  async function signOut() {
    try {
      loading = true;
      let { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    getProfile();
    return () => console.log("destroyed");
  });
</script>

<form class="form-widget" on:submit|preventDefault={updateProfile}>
  <div>
    <label for="email">Email</label>
    <input id="email" type="text" value={$user?.email} disabled />
  </div>
  <div>
    <label for="username">Name</label>
    <input id="username" type="text" bind:value={username} />
  </div>
  <div>
    <label for="website">Website</label>
    <input id="website" type="website" bind:value={website} />
  </div>

  <div>
    <input
      type="submit"
      class="button block primary"
      value={loading ? "Loading ..." : "Update"}
      disabled={loading}
    />
  </div>

  <div>
    <button
      type="button"
      class="button block"
      on:click={signOut}
      disabled={loading}
    >
      Sign Out
    </button>
  </div>
</form>

<style>
</style>
