<template>
  <div
    :class="[
      'min-h-screen flex flex-col transition-colors',
      mode === 'dark' ? 'bg-[#222222] text-gray-100' : 'bg-gray-50 text-gray-900',
    ]"
  >
    <!-- header -->
    <Header1 />
    <Header2 />
    <Header3 />

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

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme' // 전역 테마
const { mode } = useTheme()
</script>
