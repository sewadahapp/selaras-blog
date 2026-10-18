<script setup lang="ts">
import { formatDate } from '~/utils/editorial'

defineProps<{
  category?: string
  date: string
  readingTime?: string
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] text-[var(--selaras-resolved-text-muted)]">
    <span v-if="category" class="font-medium text-[var(--selaras-resolved-color-primary-text)]">{{ category }}</span>
    <span v-if="category" aria-hidden="true">·</span>
    <time :datetime="date">{{ formatDate(date) }}</time>
    <template v-if="readingTime">
      <span aria-hidden="true">·</span>
      <span>{{ readingTime }}</span>
    </template>
  </div>
</template>
