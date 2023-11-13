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

<div>
    <form use:enhance method="post" action="?/login">
        <div class="form-item">
            <label for="email">Email<sup><small class="required">*</small></sup></label>
            <input value={form?.email??''} id="email" type="email" name="email" required/>
        </div>
        <div class="form-item">
            <label for="password">Password<sup><small class="required">*</small></sup></label>
            <input id="password" type="password" name="password" required/>
        </div>

        <div class="form-item">
            {#if form?.error}
            <small>{form?.message}</small>
            {/if}
        </div>

        <div class="form-item">
            <button type="submit">Login</button>
        </div>
    </form>    
</div>
