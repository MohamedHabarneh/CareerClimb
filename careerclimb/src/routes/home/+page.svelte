<script lang="ts">
  import { page } from '$app/stores';
    export let data;
    import {user} from '../../stores'
    // console.log("Curr data", data);
    $:User = data?.authedUser;
    let newUser: any;
    let userName: string = '';

    $:{
        newUser = data?.authedUser;
        user.set(newUser);
        console.log("New user", newUser);
        console.log("user", newUser["firstName"])
        userName = newUser["firstName"];
        console.log(userName);
    }
    console.log(data);

</script>


<div>
  <div class="flex items-center justify-center text-5xl mt-10 mb-20">
    {#if userName !== ''}
      <h1> Welcome {@html userName}! </h1>
    {/if}
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 md:gap-4 ml-10">
    {#each data.newJobs as job}
        <div class="group bg-gray-900 p-4 transition-all duration-300 hover:rotate-1 lg:p-8 h-full w-1/2">
          <div class="flex items-center gap-x-2">
            <div>
              <h3 class="text-xl font-bold text-gray-50">{job.company}</h3>
              <span class="text-xs text-gray-300">{job.location}</span>
            </div>
          </div>
          <div>
            <span class="text-xs text-gray-300">{job.experienceLevel}</span>
            </div>
          <div class="flex items-center justify-left">
            <span class="text-sm font-medium text-gray-50 mr-10">{job.position}</span>
            <span class="text-sm font-medium text-gray-50">{job.postDate}</span>
          </div>
          <div>
            <a class="font-medium text-blue-500 transition-all duration-300 group-hover:text-blue-500/80" href={job.jobLink}>Apply</a>
            <a class="font-medium text-gray-500 transition-all duration-300 group-hover:text-gray-500/80" href="/">Details</a>
          </div>
        </div>
    {/each}
  </div>
  </div>



  <!-- can use this to display what tech companies use -->
  <!-- <div class="my-4">
    <h3 class="text-2xl font-medium text-gray-200">{job.jobTitle}</h3>
    <div class="text-sm font-medium">
      <span class="m-1 ml-0 inline-block text-blue-500">HTML</span>
      <span class="m-1 ml-0 inline-block text-yellow-500">CSS</span>
      <span class="m-1 ml-0 inline-block text-pink-500">FIGMA</span>
      <span class="m-1 ml-0 inline-block text-lime-500">Ad. XD</span>
      <span class="m-1 ml-0 inline-block text-blue-500">Illustrator</span>
    </div>
    <div class="mt-2 text-sm text-gray-400">$60K - $100K per year</div>
  </div> -->