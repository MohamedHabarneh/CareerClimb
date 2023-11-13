<script type="ts">
    import {enhance} from '$app/forms';
    export let form;

</script>

<div>
    <form method="post" action="?/register">
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
            <small>{form?.message}</small>
            {/if}
        </div>

        <div class="form-item">
            <button type="submit">Register</button>
        </div>
    </form>    
</div>
