<!-- <script>
  import "../app.postcss";
</script>

<slot />
 -->

<script lang="ts">
  import Navbar from '$lib/navbar.svelte';
  import { user } from '../stores';
  

  $:User = $user;
</script>

<div>
  <Navbar/>
    <slot>
    </slot>
</div>

<!-- <svelte:head>
    <style>
    </style>
</svelte:head> -->