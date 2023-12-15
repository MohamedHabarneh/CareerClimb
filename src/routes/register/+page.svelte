<script type="ts">
    import {enhance} from '$app/forms';
    export let form;

</script>

<div class="flex items-center justify-center">
    <div class="flex items-center justify-center h-screen">
        <form class="bg-gray-700 p-5 rounded-lg text-white" method="post" action="?/register">
            <div class="form-item">
                <label for="firstName"> First Name</label>
                <input value={form?.firstName?? ''} id="firstName" type="text" name="firstName" required/>
            </div>
            <div class="form-item">
                <label for="lastName"> Last Name</label>
                <input value={form?.lastName?? ''} id="lastName" type="text" name="lastName" required/>
            </div>
            <div class="form-item">
                <label for="email"> Email</label>
                <input value={form?.email?? ''} id="email" type="email" name="email" required/>
            </div>
            <div class="form-item">
                <label for="password"> Password</label>
                <input value={form?.password?? ''} id="password" type="password" name="password" required/>
            </div>
    
            <div class="form-item">
                {#if form?.error}
                <small class="text-rose-600">{form?.message}</small>
                {/if}
            </div>
    
            <div class="form-item">
                <button class="hover:text-white" type="submit">Register</button>
            </div>
            <span> Already have an account? <a class="hover:text-white hover:bg-gray-600 rounded-lg p-1 underline" href="/login"> Login</a></span>
        </form>    
    </div>
</div>

<style>
    .form-box {
        @apply  p-10 rounded-md shadow-md; /* Set your desired background color, padding, and box styling */
    }

    .form-item {
        @apply mb-1;
    }

    /* Add styles for labels and inputs */
    label {
        @apply block mb-1;
    }

    input {
        @apply w-full p-2 border border-gray-300 rounded; /* Set width, padding, and border styling for the input */
    }

    button {
        @apply bg-blue-600 text-black px-4 py-2 rounded cursor-pointer mt-3; /* Set your desired button color and styling */
    }

</style>
