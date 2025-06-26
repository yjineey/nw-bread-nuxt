<template>
  <footer
    class="block md:hidden fixed bottom-0 left-0 right-0 bg-[#222222] text-white border-t z-50"
  >
    <div class="flex justify-around items-center h-16">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        class="flex flex-col items-center justify-center flex-1 h-full transition-colors"
        :class="{ 'text-white ': isActive(tab.path), 'text-gray-400': !isActive(tab.path) }"
        @click="navigateTo(tab.path)"
      >
        <component :is="tab.icon" class="w-6 h-6" />
        <span class="text-xs mt-1">{{ tab.name }}</span>
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { BookOpenIcon, HeartIcon, HomeIcon, UserIcon, Bars3Icon } from '@heroicons/vue/24/outline'

const route = useRoute()

const tabs = [
  { name: '성경', icon: BookOpenIcon, path: '/bible/reading' },
  { name: '큐티', icon: HeartIcon, path: '/bible/qt' },
  { name: '홈', icon: HomeIcon, path: '/' },
  { name: '내정보', icon: UserIcon, path: '/auth/profile' },
  { name: '더보기', icon: Bars3Icon, path: '/more' },
]

const isActive = (path: string) => {
  return route.path === path
}
</script>
