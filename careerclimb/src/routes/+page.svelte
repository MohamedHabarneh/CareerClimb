
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
<h1>Welcome to CareerClimb!!!</h1>