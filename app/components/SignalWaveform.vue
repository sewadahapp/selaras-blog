<script setup lang="ts">
// A drawn "small sound": one deterministic waveform motif for the brand.
// Heights are a fixed sequence (no randomness) so SSR and hydration match.
const BARS = [
  16, 30, 22, 44, 36, 58, 40, 26, 68, 52, 30, 62, 44, 24, 78, 56,
  34, 60, 42, 72, 28, 50, 38, 84, 48, 26, 64, 46, 36, 74, 32, 58,
  22, 66, 52, 40, 28, 80, 48, 62, 34, 24, 70, 56, 44, 90, 38, 54,
  30, 76, 46, 60, 26, 42, 68, 36, 50, 86, 40, 32, 72, 58, 46, 24,
]
const LIME = new Set([9, 15, 23, 34, 41, 47, 57])
</script>

<template>
  <div aria-hidden="true" class="flex h-20 w-full items-end justify-between sm:h-28">
    <span
      v-for="(bar, i) in BARS"
      :key="i"
      class="w-[3px] origin-bottom animate-signal-rise"
      :class="LIME.has(i) ? 'bg-[var(--night-accent)]' : 'bg-[var(--selaras-resolved-border-hover)]'"
      :style="{ height: `${bar}%`, animationDelay: `${i * 12}ms` }"
    />
  </div>
</template>
