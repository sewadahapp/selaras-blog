<script setup lang="ts">
import type { JournalCollectionItem } from '@nuxt/content'
import { formatDate } from '~/utils/editorial'

defineProps<{ post: JournalCollectionItem }>()
</script>

<template>
  <SCard class="journal-card" :ui="{ root: 'bg-transparent' }">
    <NuxtLink :to="post.path" class="media-link" :aria-label="`Read ${post.title}`">
      <img v-if="post.cover" :src="post.cover" :alt="post.coverAlt || ''" width="900" height="640" loading="lazy" class="article-image">
      <div v-else class="article-image media-fallback"><SIcon name="lucide:feather" class="size-10" /></div>
    </NuxtLink>
    <h3 class="card-title"><NuxtLink :to="post.path">{{ post.title }}</NuxtLink></h3>
    <p class="card-description">{{ post.description }}</p>
    <template #footer>
      <p class="flex items-center gap-2 text-[0.8125rem] text-[var(--selaras-resolved-text-muted)]">
        <span>{{ post.category }}</span>
        <span aria-hidden="true">·</span>
        <time :datetime="post.date">{{ formatDate(post.date) }}</time>
        <template v-if="post.readingTime">
          <span aria-hidden="true">·</span>
          <span>{{ post.readingTime }}</span>
        </template>
      </p>
    </template>
  </SCard>
</template>
