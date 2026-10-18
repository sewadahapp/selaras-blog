<script setup lang="ts">
import { formatDate } from '~/utils/editorial'

const props = defineProps<{ author?: string, date?: string }>()

const author = computed(() => props.author?.trim() || 'Naya Arunika')
const initials = computed(() =>
  author.value
    .split(/\s+/)
    .map(word => word.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase(),
)
</script>

<template>
  <div class="flex items-center gap-3 text-[0.82rem] text-[var(--selaras-resolved-text-muted)]">
    <SAvatar :text="initials" :name="author" size="sm" />
    <span>
      {{ author }}
      <time v-if="date" :datetime="date" class="block">{{ formatDate(date) }}</time>
    </span>
  </div>
</template>
