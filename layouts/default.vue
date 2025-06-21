<template>
  <div class="min-h-screen flex flex-col bg-primary text-primary">
    <Header1 />
    <Header2 />
    <Header3 />

    <main class="flex-1">
      <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NuxtPage />
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts"></script>
