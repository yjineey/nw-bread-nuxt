<template>
  <footer class="bg-[#222222] text-white border-t">
    <div
      class="mx-auto max-w-screen-xl [grid-template-columns:1fr_2fr_1fr] grid items-center gap-4 py-4 px-4"
    >
      <div class="flex justify-start">
        <img src="/logos/nw_sm_logo.png" alt="NEWWAY 로고" class="w-50 h-45" />
      </div>

      <div class="text-left text-xs sm:text-sm leading-snug">
        <p>뉴웨이교회</p>
        <p>서울특별시 강서구 화곡로 64길 67</p>
        <p>전화 070-4047-0478 | 이메일 newwaychurchkr@gmail.com</p>
        <p>온라인 헌금 계좌 국민은행 718201-01-219521 (예금주: 뉴웨이교회)</p>
        <p>ⓒ {{ year }} NEWWAY CHURCH. All rights reserved.</p>

        <div class="mt-2 flex gap-3">
          <NuxtLink to="https://www.youtube.com/@newwaychurchkr" target="_blank">
            <img src="/icons/youtube.svg" alt="YouTube" class="w-5 h-5 invert" />
          </NuxtLink>
          <NuxtLink to="https://www.youtube.com/@newwaychurchkr" target="_blank">
            <img src="/icons/youtubekids.svg" alt="YouTube Kids" class="w-5 h-5 invert" />
          </NuxtLink>
          <NuxtLink to="https://www.instagram.com/newwaychurchkr/" target="_blank">
            <img src="/icons/instagram.svg" alt="Instagram" class="w-5 h-5 invert" />
          </NuxtLink>
          <NuxtLink to="https://www.facebook.com/newwaychurchkr" target="_blank">
            <img src="/icons/facebook.svg" alt="Facebook" class="w-5 h-5 invert" />
          </NuxtLink>
        </div>
      </div>

      <div class="flex justify-end">
        <img src="/logos/kaicam_logo.png" alt="kaicam" class="w-80 h-5" />
        <button
          @click="scrollToTop"
          class="fixed bottom-5 right-5 z-50 bg-[#222222] hover:bg-gray-700 text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition"
          aria-label="맨 위로"
        >
          <ArrowUpCircleIcon class="w-8 h-8" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ArrowUpCircleIcon } from '@heroicons/vue/24/outline'

const year = new Date().getFullYear()

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
