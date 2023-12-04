<script lang="ts">
    export let data;
    import {user} from '../../stores'
    $:User = data?.authedUser;
    let newUser: any;
    let userName: string = '';

    $:{
        newUser = data?.authedUser;
        user.set(newUser);
        // console.log("New user", newUser);
        // console.log("user", newUser["firstName"])
        userName = newUser["firstName"];
        // console.log(userName);
    }
    console.log(data);
    let showQuiz = false;
    let recommendedField: string | null = null;
    let questions = [
    {
      question: "What type of projects do you find most interesting?",
      options: [
        "A. Developing software applications",
        "B. Analyzing and interpreting data",
        "C. Designing and styling web pages",
      ],
    },
    {
      question: "Which activities do you enjoy the most?",
      options: [
        "A. Writing and debugging code",
        "B. Working with data and statistics",
        "C. Creating visually appealing interfaces",
      ],
    },
    {
      question: "What field excites you the most?",
      options: [
        "A. Software Engineering",
        "B. Data Science",
        "C. Front-end Engineering",
      ],
    },
    {
      question: "Which skills would you like to enhance?",
      options: [
        "A. Programming and problem-solving",
        "B. Data analysis and interpretation",
        "C. Web design and user experience",
      ],
    },
    {
      question: "What aspect of technology interests you?",
      options: [
        "A. Building and optimizing software",
        "B. Harnessing insights from data",
        "C. Crafting engaging user interfaces",
      ],
    },
    {
      question: "If you could contribute to a tech project, what would it be?",
      options: [
        "A. Developing new features and functionality",
        "B. Analyzing trends and making data-driven decisions",
        "C. Enhancing the visual appeal and user interaction",
      ],
    },
    ];

    const startQuiz = () => {
        showQuiz = true;
        recommendedField = null;
    };

    let userAnswers = Array(questions.length).fill([]);

    const submitQuiz = () => {
        const selectedAnswers = userAnswers.map(answer => answer !== null ? answer : "");

        if (selectedAnswers[0] === "A" && selectedAnswers[1] === "A") {
        recommendedField = "Software Engineering";
        } else if (selectedAnswers[2] === "B" && selectedAnswers[3] === "B") {
        recommendedField = "Data Science";
        } else if (selectedAnswers[4] === "C" && selectedAnswers[5] === "C") {
        recommendedField = "Front-end Engineering";
        } else {
        recommendedField = "Software Engineering"; 
        }
    };

</script>




<div>
    {#if showQuiz}
        {#each questions as {question, options}, index (index)}
        <div class="mb-4 p-4 rounded-md border border-gray-300">
            <p>{question}</p>
            {#each options as option (option)}
              <label class="block">
                <input type="radio" bind:group={userAnswers[index]} value={option} class="mr-2" />
                {option}
              </label>
            {/each}
          </div>
        {/each}
        <button on:click={submitQuiz} class="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        {#if recommendedField !== null}
        <p class="mt-5 ml-4 mb-4 text-6xl ">Recommended Field: {recommendedField}</p>
        {/if}
    {:else}
        <div class="flex justify-center bg-gray-800">
            <div class="flex justify-center items-center  h-screen">
                <button class="flex justify-center items-center text-4xl bg-gray-900 text-white p-2 rounded-md hover:text-blue-700" on:click={startQuiz}> Start Quiz</button>
            </div>
        </div>
    {/if}
</div>