<script>
    
    import {page} from '$app/stores';
    import {user} from '../stores'
    import {onMount} from 'svelte';

    let isLoggedIn = false;

    
    const nonUserTabs = ['','/','/Register','/Login'];
    const userTabs = ['','/','/Home','Profile','Logout'];
    
    onMount(() => {
        const unsubscribe = user.subscribe(value => {
            isLoggedIn = value !== undefined;
        });
        return () => {
            unsubscribe();
        };
    });
</script>

<div>
    <nav>
        {#if !isLoggedIn}
            <div>
                {#each nonUserTabs as tab}
                    <a href={tab.toLowerCase()}>{tab === '' ? 'Home' : tab.slice(1)}</a>
                {/each}
            </div>
        {:else}
            <div>
                {#each nonUserTabs as tab}
                    <a href={tab.toLowerCase()}>{tab === '' ? 'Home' : tab.slice(1)}</a>
                {/each}
            </div>
        {/if}
    </nav>
</div>

<style>
    nav {
        display: flex;
        justify-content: space-between;
    }

    a {
        text-decoration: none; 
        color: black;
        margin: 0 2px;
    }

    a:hover {
        text-decoration: underline; 
    }
</style>