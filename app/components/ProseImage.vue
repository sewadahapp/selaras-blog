<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
  width?: number | string
  height?: number | string
}>()
</script>

<template>
  <figure class="animate-editorial-rise [animation-delay:320ms]">
    <img
      v-if="src"
      :src="src"
      :alt="alt ?? ''"
      :width="width"
      :height="height"
      decoding="async"
      class="w-full rounded-[var(--selaras-resolved-radius-md)] bg-[var(--selaras-resolved-surface-elevated)]"
    >
    <figcaption v-if="alt" class="mt-3 text-[0.8125rem] text-[var(--selaras-resolved-text-muted)]">
      {{ alt }}
    </figcaption>
  </figure>
</template>
