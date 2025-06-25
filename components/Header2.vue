<template>
  <header class="bg-primary border-theme sticky top-0 z-50 px-4 border-t border-b">
    <nav class="shadow">
      <div class="relative mx-auto max-w-screen-xl h-16 flex items-center justify-between text-sm">
        <!-- Header3만 고정 할 때 사용-->
        <!-- <nav class="sticky top-0 z-40 border-b">
           <div class="mx-auto max-w-screen-xl h-16 flex items-center justify-between text-sm "
      > -->
        <div class="header2-field flex gap-4">
          <NuxtLink to="/church/about" class="hover:underline">ABOUT</NuxtLink>
          <NuxtLink to="/church/worship" class="hover:underline">WORSHIP</NuxtLink>
          <NuxtLink to="/church/mission" class="hover:underline">MISSION</NuxtLink>
        </div>

        <h1 class="absolute left-1/2 -translate-x-1/2 text-xl font-bold whitespace-nowrap">
          <NuxtLink to="/" class="flex items-center gap-2"> NEWWAY CHURCH </NuxtLink>
        </h1>

        <div class="header2-field flex gap-4 justify-end">
          <NuxtLink to="/church/content" class="hover:underline">CONTENT</NuxtLink>
          <NuxtLink to="/church/contact" class="hover:underline">CONTACT</NuxtLink>
          <NuxtLink to="/church/events" class="hover:underline">EVENTS</NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
/* 모바일(기본): 좌·우 메뉴 숨김 */
.header2-field {
  display: none;
}

/* 데스크톱(≥768 px): 좌·우 메뉴 보임 */
@media (min-width: 768px) {
  .header2-field {
    display: flex;
  }
}
</style>
