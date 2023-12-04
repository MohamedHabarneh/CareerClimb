
<script lang="ts">
    import {user} from "../stores";
    export let data;

    $:User = data?.authedUser;

    $:{
        const newUser = data?.authedUser;
        user.set(newUser);
    }
    console.log(data);
</script>


<div class="grid">
    <div class="grid items-center justify-center mt-20">
        <h1 class="text-4xl"> Welcome to CareerClimb!</h1>
    </div>
    <div class="mt-20 mx-80 text-center">
        <p class="text-lg">At CareerClimb, we are dedicated to guiding you on your professional ascent. As a dynamic job board, our mission is to empower individuals like you to navigate the exciting terrain of career opportunities.</p>
    </div>
</div>