<script lang="ts">
    
    import {page} from '$app/stores';
    import {user} from '../stores'
    import {onMount} from 'svelte';

    let isLoggedIn = false;
    let loggedInUser = "";

    
    const nonUserTabs = ['','/','/Home','/Register','/Login', '/Jobs'];
    const userTabs = ['','/','/Home','/Dashboard','/Profile','/Quiz', '/Jobs', '/Logout'];


    onMount(() => {
        const unsubscribe = user.subscribe(value => {
            console.log("User is set or not: ", value);
            isLoggedIn = value !== undefined;
        });
        return () => {
            unsubscribe();
        };
    });
</script>

<div class="z-1000">
    <nav class="bg-gray-200  top-0 left-0 w-full p-4 z-999">
        {#if isLoggedIn}
            <div class="max-w-7x1 mx-auto border">
                    <!-- Display for logged-in users -->
                <div class="flex items-center justify-center ">
                    {#each userTabs as tab}
                        {#if tab == "/Home"}
                            <a  href="/" class="text-black ml-4 no-underline hover:text-blue-500">{tab.slice(1)}</a>
                        {:else}
                            <a  href={tab.toLowerCase()} class="text-black ml-4 no-underline hover:text-blue-500">{tab.slice(1)}</a>
                        {/if}
                    {/each}
                </div>
            </div>
        {:else}
            <div class="max-w-7x1 mx-auto border">
                <!-- Display for logged-in users -->
                <div class="flex items-center justify-center ">
                    {#each nonUserTabs as tab}
                        {#if tab == "/Home"}
                            <a  href="/" class="text-black ml-4 no-underline hover:text-blue-500">{tab.slice(1)}</a>
                        {:else}
                            <a  href={tab.toLowerCase()} class="text-black ml-4 no-underline hover:text-blue-500">{tab.slice(1)}</a>
                        {/if}
                    {/each}
                </div>
            </div>
        {/if}
    </nav>
</div>

<style>
</style>