<template>
  <nav class="bg-white border-b sticky top-0 z-50">
    <div
      class="mx-auto max-w-screen-xl h-16 flex items-center justify-between text-sm text-gray-800"
    >
      <!-- HeaderZone3만 고정 할 때 사용-->
      <!-- <nav class="bg-white border-b sticky top-0 z-40">
        <div class="mx-auto max-w-screen-xl h-16 flex items-center justify-between text-sm text-gray-800"
        > -->
      <div class="header2-desktop flex gap-4">
        <!-- 교회소개 -->
        <a href="/church/about" class="hover:underline">ABOUT</a>

        <!-- 예배안내 -->
        <a href="/church/worship" class="hover:underline">WORSHIP</a>

        <!-- 사역소개 -->
        <a href="/church/mission" class="hover:underline">MISSION</a>
      </div>

      <h1 class="text-center text-xl font-bold whitespace-nowrap">
        <a href="/">NEWWAY CHURCH</a>
      </h1>

      <div class="header2-desktop flex gap-4 justify-end">
        <!-- 설교 영상 / 사진  -->
        <a href="/church/content" class="hover:underline">CONTENT</a>

        <!-- 문의 / 위치 -->
        <a href="/church/contact" class="hover:underline">CONTACT</a>

        <!-- 	교회 행사 / 일정 -->
        <a href="/church/events" class="hover:underline">EVENTS</a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
/* 모바일(기본) : 좌·우 메뉴 숨김 */
.header2-desktop {
  display: none;
}

/* 데스크톱(≥768 px) : 좌·우 메뉴 보임 */
@media (min-width: 768px) {
  .header2-desktop {
    display: flex;
  }
}
</style>
