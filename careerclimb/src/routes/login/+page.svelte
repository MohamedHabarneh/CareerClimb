<script type="ts">
    import {enhance} from '$app/forms';
    import {user} from '../../stores'
    export let form;
    export let data;

    $:clearUser = data?.clearUser;
    console.log(clearUser);
    $:{
        if(clearUser) user.set(undefined);
    }

</script>

<div class="flex justify-center">
    <div class="flex justify-center items-center h-screen">
        <form class="bg-gray-800 p-6 rounded-lg" use:enhance method="post" action="?/login">
            <div class="form-item">
                <label class="text-white" for="email">Email<sup><small class="required">*</small></sup></label>
                <input value={form?.email??''} id="email" type="email" name="email" required/>
            </div>
            <div class="form-item">
                <label class="text-white"  for="password">Password<sup><small class="required">*</small></sup></label>
                <input id="password" type="password" name="password" required/>
            </div>
    
            <div class="form-item">
                {#if form?.error}
                <small>{form?.message}</small>
                {/if}
            </div>
    
            <div class="form-item">
                <button class="hover:text-white"type="submit">Login</button>
            </div>
            <span class="text-white" > Don't have an account? <a class="hover:text-white hover:bg-gray-600 rounded-lg p-1 underline" href="/register">Register</a></span>
        </form>    
    </div>
</div>

<style>
    .form-box {
        @apply  p-10 rounded-md shadow-md; 
    }

    .form-item {
        @apply mb-1;
    }


    label {
        @apply block mb-1;
    }

    input {
        @apply w-full p-2 border border-gray-300 rounded; 
    }

    button {
        @apply bg-blue-600 text-black px-4 py-2 rounded cursor-pointer mt-3; 
    }

</style>