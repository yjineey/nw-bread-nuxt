<template>
  <header
    :class="['sticky top-0 z-50 border-b px-4', mode === 'dark' ? 'bg-[#212121]' : 'bg-gray-50']"
  >
    <nav class="shadow">
      <div class="relative mx-auto max-w-screen-xl h-16 flex items-center justify-between text-sm">
        <!-- HeaderZone3만 고정 할 때 사용-->
        <!-- <nav class="sticky top-0 z-40 border-b">
           <div class="mx-auto max-w-screen-xl h-16 flex items-center justify-between text-sm "
      > -->
        <div class="header2-field flex gap-4">
          <a href="/church/about" class="hover:underline">ABOUT</a>
          <a href="/church/worship" class="hover:underline">WORSHIP</a>
          <a href="/church/mission" class="hover:underline">MISSION</a>
        </div>

        <h1 class="absolute left-1/2 -translate-x-1/2 text-xl font-bold whitespace-nowrap">
          <a href="/">NEWWAY CHURCH</a>
        </h1>

        <div class="header2-field flex gap-4 justify-end">
          <a href="/church/content" class="hover:underline">CONTENT</a>
          <a href="/church/contact" class="hover:underline">CONTACT</a>
          <a href="/church/events" class="hover:underline">EVENTS</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const { mode } = useTheme()
</script>

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
