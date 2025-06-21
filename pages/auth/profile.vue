<template>
  <section>
    <h2 class="text-2xl font-bold mb-4">마이페이지</h2>
    <p class="">마이페이지 페이지 입니다</p>

    <div class="border-b border-default h-24 flex items-center justify-between px-4">
      <div class="text-primary font-bold text-xl">로고</div>

      <div class="flex items-center gap-4">
        <button @click="toggleDark">
          {{ mode === 'dark' ? '🌙' : '☀️' }}
        </button>
      </div>
    </div>

    <div class="border-b border-default h-24 flex items-center justify-between px-4">
      <div class="text-primary font-bold text-xl">테마</div>
      <div class="flex items-center gap-4">
        <div class="flex gap-2">
          <button
            v-for="(scheme, key) in colorSchemes"
            :key="key"
            @click="setColorScheme(key)"
            :class="[
              'w-6 h-6 rounded-full border-2 transition-all',
              colorScheme === key ? 'scale-110 border-gray-400' : 'border-gray-200',
            ]"
            :style="{ backgroundColor: scheme.color }"
            :title="scheme.name"
          />
        </div>
      </div>
    </div>

    <div class="border-b border-default h-24 flex items-center justify-between px-4">
      <div class="text-primary font-bold text-xl">버튼</div>
      <div class="flex items-center gap-4">
        <div class="flex gap-2">
          <button class="btn-primary">확인</button>
          <button class="btn-secondary">취소</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline'
const { mode, colorScheme, toggleDark, setColorScheme, colorSchemes } = useTheme()
</script>
