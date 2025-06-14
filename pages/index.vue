<template>
  <div class="space-y-6">
    <div v-for="n in 50" :key="n" class="p-6 bg-gray-50 rounded shadow text-black">
      콘텐츠 {{ n }}
    </div>
  </div>
</template>

<script setup lang="ts"></script>
