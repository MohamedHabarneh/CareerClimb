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
          console.log(newUser);
          if(newUser){
            userName = newUser["firstName"];
          }
      }
      // console.log(data);
      let filters = {
        company: "",
        experienceLevel: "",
        jobTitle: "",
        location: "",
      };

      let allJobs = data?.newJobs;

      let companyList = ["Notion", "REVOLVE", "Meta", "Google","Discord","Paramount+","Netflix"]; //#TODO: dynamically grab companies from company table
      let experienceLevelList = ["Internship","Entry level","Mid-Senior level","Associate"];//#TODO: dynamically grab experience levels
      let jobTitleList = ["Software Engineer", "QA Tester", "Data Engineer", "Data Scientist", "Full-Stack Software Engineer"];//#TODO: dynamically grab job titles
      let locationList = ["California, United States", "San Francisco", "Los Angeles", "Livermore", "Irvine", "San Diego"];

      const applyFilters = () => {
          let filteredJobs = data.newJobs.filter((job) => {
            return(
              (filters.company == "" || job.company.toLowerCase().includes(filters.company.toLocaleLowerCase())) &&
              (filters.location == "" || job.location.toLowerCase().includes(filters.location.toLocaleLowerCase())) &&
              (filters.experienceLevel == "" || job.experienceLevel.toLowerCase().includes(filters.experienceLevel.toLocaleLowerCase())) &&
              (filters.jobTitle == "" || job.jobTitle.toLowerCase().includes(filters.jobTitle.toLocaleLowerCase()))
            );
          });
          allJobs = filteredJobs;
          // console.log(allJobs);
      }

      const resetFilters = () => {
        //reset to all jobs and no filters.
        filters = {
          company: "",
          experienceLevel: "",
          jobTitle: "",
          location: "",
        };
        allJobs = data?.newJobs;
      }
      // console.log(allJobs);
  </script>
  

  <div class="flex space-x-4 ml-80 mt-10">
    <select bind:value={filters.company} class="border p-2" on:change={applyFilters}>
      <option value="">Select Company</option>
      {#each companyList as company}
        <option value={company}> {company}</option>
      {/each}
    </select>
  
    <select bind:value={filters.experienceLevel} class="border p-2" on:change={applyFilters}>
      <option value="">Select Experience Level</option>
      {#each experienceLevelList as experienceL}
        <option value={experienceL}> {experienceL}</option>
      {/each}
    </select>
  
    <select bind:value={filters.jobTitle} class="border p-2" on:change={applyFilters}>
      <option value="">Select Job Title</option>
      {#each jobTitleList as jobTitle}
        <option value={jobTitle}> {jobTitle}</option>
      {/each}
    </select>
  
    <select bind:value={filters.location} class="border p-2" on:change={applyFilters}>
      <option value="">Select Location</option>
      {#each locationList as location}
        <option value={location}> {location}</option>
      {/each}
    </select>
  
    <button on:click={applyFilters} class="bg-blue-500 text-white p-2">Apply Filters</button>
    <button on:click={resetFilters} class="bg-blue-500 text-white p-2">Reset Filters</button>
  </div>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-5 md:gap-4 ml-10 mt-10 mr-10 mb-10">
      {#each allJobs as job}
        <div class="group bg-gray-800 border border-gray-300 shadow-md p-4 transition-all duration-300 hover:scale-105 lg:p-8 h-full w-full">
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
            <span class="text-sm font-medium text-gray-300 mr-10">{job.jobTitle}</span>
            <!-- <span class="text-sm font-medium text-gray-50">{job.postDate}</span> -->
          </div>
          <div>
            <a class="font-medium text-blue-500 transition-all duration-300 hover:text-blue-800" href={job.jobLink}>Apply</a>
            <a class="font-medium text-gray-500 transition-all duration-300 hover:text-gray-600" href="/">Details</a>
          </div>
        </div>
      {/each}
    </div>
    </div>
  
  
  