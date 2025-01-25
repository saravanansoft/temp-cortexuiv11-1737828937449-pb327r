<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Quiz, QuizQuestion } from '../../lib/data/mockQuizData';
  
  export let quiz: Quiz;
  
  const dispatch = createEventDispatcher();
  
  let currentQuestionIndex = 0;
  let answers: Record<string, string> = {};
  let submitted = false;
  let score = 0;
  
  $: currentQuestion = quiz.questions[currentQuestionIndex];
  $: progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  $: isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  $: isAnswered = answers[currentQuestion?.id];
  
  function handleAnswer(questionId: string, answerId: string) {
    answers = { ...answers, [questionId]: answerId };
  }
  
  function goToQuestion(index: number) {
    if (!submitted) {
      currentQuestionIndex = index;
    }
  }
  
  function handleNext() {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      currentQuestionIndex++;
    }
  }
  
  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
    }
  }
  
  function handleSubmit() {
    score = quiz.questions.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    submitted = true;
  }
</script>

<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <div class="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
    <!-- Header -->
    <div class="p-6 border-b border-gray-200">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-900">{quiz.title}</h2>
        {#if !submitted}
          <button 
            class="text-gray-500 hover:text-gray-700"
            on:click={() => dispatch('close')}
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        {/if}
      </div>
      
      {#if !submitted}
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div 
            class="bg-primary h-2 rounded-full transition-all duration-300"
            style="width: {progress}%"
          ></div>
        </div>
        <div class="flex justify-between mt-2 text-sm text-gray-600">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
      {/if}
    </div>
    
    <!-- Content -->
    <div class="p-6 flex-1 overflow-y-auto">
      {#if submitted}
        <!-- Results View -->
        <div class="text-center">
          <div class="mb-8">
            <div class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
              <span class="text-3xl font-bold text-primary">{Math.round((score / quiz.questions.length) * 100)}%</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
            <p class="text-gray-600">You got {score} out of {quiz.questions.length} questions correct</p>
          </div>
          
          <!-- Detailed Results -->
          <div class="space-y-4 text-left">
            {#each quiz.questions as question, index}
              <div class="p-4 rounded-lg {answers[question.id] === question.correctAnswer ? 'bg-green-50' : 'bg-red-50'}">
                <p class="font-medium mb-2">
                  {index + 1}. {question.text}
                </p>
                <p class="text-sm">
                  Your answer: 
                  <span class={answers[question.id] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                    {question.options.find(opt => opt.id === answers[question.id])?.text}
                  </span>
                </p>
                {#if answers[question.id] !== question.correctAnswer}
                  <p class="text-sm text-green-600">
                    Correct answer: {question.options.find(opt => opt.id === question.correctAnswer)?.text}
                  </p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
      {:else}
        <!-- Question View -->
        <div class="space-y-6">
          <h3 class="text-xl font-medium text-gray-900">
            {currentQuestion.text}
          </h3>
          
          <div class="space-y-3">
            {#each currentQuestion.options as option}
              <button
                class="w-full p-4 rounded-lg border-2 transition-all {answers[currentQuestion.id] === option.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'}"
                on:click={() => handleAnswer(currentQuestion.id, option.id)}
              >
                <div class="flex items-center">
                  <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 {answers[currentQuestion.id] === option.id ? 'border-primary' : 'border-gray-300'}">
                    {#if answers[currentQuestion.id] === option.id}
                      <div class="w-3 h-3 rounded-full bg-primary"></div>
                    {/if}
                  </div>
                  <span class="text-left">{option.text}</span>
                </div>
              </button>
            {/each}
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Footer -->
    <div class="p-6 border-t border-gray-200">
      {#if submitted}
        <button
          class="btn-primary w-full"
          on:click={() => dispatch('close')}
        >
          Close Quiz
        </button>
      {:else}
        <div class="flex items-center justify-between">
          <!-- Question Navigation -->
          <div class="flex space-x-2">
            {#each quiz.questions as _, index}
              <button
                class="w-8 h-8 rounded-full flex items-center justify-center text-sm {currentQuestionIndex === index ? 'bg-primary text-white' : answers[quiz.questions[index].id] ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'}"
                on:click={() => goToQuestion(index)}
              >
                {index + 1}
              </button>
            {/each}
          </div>
          
          <!-- Navigation Buttons -->
          <div class="flex space-x-3">
            <button
              class="btn-secondary"
              on:click={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            
            <button
              class="btn-primary min-w-[100px]"
              on:click={handleNext}
              disabled={!isAnswered}
            >
              {isLastQuestion ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>