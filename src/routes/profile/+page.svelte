<script lang="ts">
      export let data;
      import {user} from '../../stores'
      // console.log("Curr data", data);
      $:User = data?.authedUser;
      let newUser: any;
      let userName: string = '';
      let userEmail: string = '';
      let inputsDisabled = true;
  
      $:{
          newUser = data?.authedUser;
          user.set(newUser);
          // console.log("New user", newUser);
          // console.log("user", newUser["firstName"])
          userName = newUser["firstName"];
          userEmail = newUser["email"];
          // console.log(userName);
      }
      console.log(data);

      function updateUserInfo() {
        // For now, let's just log the updated information
        // console.log('Updated User Name:', userName);
        // console.log('Updated User Email:', userEmail);
        inputsDisabled = true;
      }
  
  </script>


<div class="grid text-xl mt-10 mb-20">
    <p class="grid items-center justify-center text-5xl"> Profile </p>
    {#if newUser}
      <div>
        <label for="userName">User Name: </label>
        <input id="userName" bind:value={userName} readonly={!inputsDisabled} class="border p-2" />
      </div>
  
      <div>
        <label for="userEmail">Email: </label>
        <input id="userEmail" bind:value={userEmail} readonly={!inputsDisabled} class="border p-2" />
        {#if true}
        <span class="text-red-500 text-sm">* Email already exists</span>
        {/if}
      </div>
  
      {#if inputsDisabled}
        <button on:click={updateUserInfo} class="mt-2 p-2 bg-blue-500 text-white w-36">Update</button>
      {/if}
    {/if}
  </div>