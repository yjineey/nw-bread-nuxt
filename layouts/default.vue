<template>
  <div class="min-h-screen flex flex-col bg-white text-black">
    <!-- header -->
    <HeaderZone1 />
    <HeaderZone2 />
    <HeaderZone3 />

    <!-- main -->
    <main class="flex-1">
      <div class="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NuxtPage />
      </div>
    </main>

    <!-- footer -->
    <Footer />
  </div>
</template>
