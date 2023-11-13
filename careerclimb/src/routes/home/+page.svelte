<script lang="ts">
  import { page } from '$app/stores';
    export let data;
    import {user} from '../../stores'
    // console.log("Curr data", data);

</script>


<div>
    {#each data.newJobs as job}
      <div class="job-card">
        <h3>{job.jobTitle}</h3>
        <p>Position: {job.position}</p>
        <p>Post Date: {job.postDate}</p>
        <p>Experience Level: {job.experienceLevel}</p>
      </div>
    {/each}
  </div>