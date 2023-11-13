<script lang="ts">
    
    import {page} from '$app/stores';
    // import {UserWithoutPass} from '../types/form';
    import {user} from '../stores'
    import {onMount} from 'svelte';

    let isLoggedIn = false;
    let loggedInUser = "";

    
    const nonUserTabs = ['','/','/Home','/Register','/Login'];
    const userTabs = ['','/','/Home','/Profile','/Jobs', '/Logout'];


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
                    <a  href={tab.toLowerCase()} class="text-black ml-4 no-underline hover:text-blue-500">{tab.slice(1)}</a>
                    {/each}
                </div>
            </div>
        {:else}
            <div class="max-w-7x1 mx-auto border">
                <!-- Display for logged-in users -->
                <div class="flex items-center justify-center ">
                    {#each nonUserTabs as tab}
                    <a  href={tab.toLowerCase()} class="text-black ml-4 no-underline hover:text-blue-500">{tab.slice(1)}</a>
                    {/each}
                </div>
            </div>
        {/if}
    </nav>
</div>

<style>
    /* nav {
        display: flex;
        justify-content: center;
        align-items: center;

    }

    a {
        text-decoration: none; 
        color: black;
        margin: 0 30px; /* Adjust the margin to control spacing */
    /* }

    a:hover {
        text-decoration: underline; 
    } */ 
</style>
        <!-- {:else}
             Display for non-logged-in users 
            <div class="flex items-center">
            {#each nonUserTabs as tab}
                {#if tab !== "" && tab !== "/"}
                <a href={tab.toLowerCase()} class="text-white ml-4">{tab.slice(1)}</a>
                {/if}
            {/each}
            </div> -->