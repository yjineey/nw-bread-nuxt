<template>
  <div class="p-4 pb-20">
    <div class="grid grid-cols-4 gap-4 mb-8">
      <button
        v-for="item in bibleItems"
        :key="item.name"
        class="flex flex-col items-center"
        @click="item.path && navigateTo(item.path)"
        :disabled="!item.path"
      >
        <div
          class="w-20 h-20 bg-gray-100 rounded-lg flex flex-col items-center justify-center shadow-sm"
        >
          <component v-if="item.icon" :is="item.icon" class="w-6 h-6 text-blue-500 mb-1" />
          <div v-else-if="item.svg" v-html="item.svg" class="w-6 h-6 text-blue-500 mb-1"></div>
          <span v-if="item.name" class="text-xs text-gray-600">{{ item.name }}</span>
        </div>
      </button>
    </div>

    <!-- 구분선 -->
    <div class="border-t border-gray-300 my-6"></div>

    <div class="grid grid-cols-4 gap-4">
      <button
        v-for="item in churchItems"
        :key="item.name"
        class="flex flex-col items-center"
        @click="item.path && navigateTo(item.path)"
        :disabled="!item.path"
      >
        <div
          class="w-20 h-20 bg-gray-100 rounded-lg flex flex-col items-center justify-center shadow-sm"
        >
          <component v-if="item.icon" :is="item.icon" class="w-6 h-6 text-gray-500 mb-1" />
          <span v-else-if="item.text" class="text-lg font-bold text-gray-500 mb-1">{{
            item.text
          }}</span>
          <div v-else-if="item.svg" v-html="item.svg" class="w-6 h-6 text-gray-500 mb-1"></div>
          <span v-if="item.name" class="text-xs text-gray-600">{{ item.name }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BuildingStorefrontIcon,
  BuildingLibraryIcon,
  BookOpenIcon,
  UserIcon,
  MusicalNoteIcon,
  PhotoIcon,
  StarIcon,
  TagIcon,
} from '@heroicons/vue/24/outline'

const bibleItems = [
  {
    name: '성경통독',
    path: '/bible/reading',
    icon: BookOpenIcon,
  },
  {
    name: 'QT',
    path: '/bible/qt',
    svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
  },
  {
    name: '오늘의말씀',
    path: '/bible/reading',
    svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
  },
  {
    name: '보혈선포기도문',
    path: '/bible/prayer',
    svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zM12 6v10M9 10h6"></path></svg>',
  },
]

const churchItems = [
  {
    name: '교회소개',
    path: '/church/about',
    icon: BuildingLibraryIcon,
  },
  {
    name: '예배안내',
    path: '/church/worship',
    icon: BookOpenIcon,
  },
  {
    name: '사역소개',
    path: '/church/mission',
    icon: UserIcon,
  },
  {
    name: '설교영상',
    path: '/church/sermon',
    svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>',
  },
  {
    name: '주보',
    path: '/church/bulletin',
    svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
  },

  {
    name: '일정',
    path: '/church/schedule',
    svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
  },
  {
    name: '사진첩',
    path: '/church/gallery',
    svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
  },
  {
    name: '오시는길',
    path: '/church/location',
    svg: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
  },
]
</script>
