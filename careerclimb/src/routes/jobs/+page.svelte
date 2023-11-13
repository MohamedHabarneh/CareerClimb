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
          userName = newUser["firstName"];
      }
      console.log(data);
  
  </script>
  
  
  <div>
    <div class="grid grid-cols-1 md:grid-cols-5 md:gap-4 ml-10 mt-10">
      {#each data.newJobs as job}
          <div class="group bg-gray-900 p-4 transition-all duration-300 hover:rotate-1 lg:p-8 h-full w-full">
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
  
  
  