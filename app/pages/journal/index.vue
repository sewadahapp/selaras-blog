<script setup lang="ts">
const { data: posts } = await useAsyncData('journal-index', () => {
  return queryCollection('journal').order('date', 'DESC').all()
})

const featured = computed(() => posts.value?.[0])
const rest = computed(() => posts.value?.slice(1) ?? [])

useSeoMeta({
  title: 'Journal · Naya Arunika',
  description: 'Notes from the studio, the road, and the spaces between songs.',
})
</script>

<template>
  <SContainer class="py-16 sm:py-24">
    <div class="journal-heading">
      <div>
        <h1>Ideas worth keeping.</h1>
      </div>
      <div>
        <p class="journal-heading-copy">
          Notes from the studio, the road, and the spaces between songs. A
          Markdown-powered archive of observations, process, and unfinished
          thoughts.
        </p>
        <SButton v-if="featured" :to="featured.path" class="journal-cta" trailing-icon="lucide:arrow-down-right">Read the latest</SButton>
      </div>
    </div>

    <div v-if="featured" class="journal-featured">
      <NuxtLink :to="featured.path" class="journal-featured-image media-link" :aria-label="`Read ${featured.title}`">
        <img
          v-if="featured.cover"
          :src="featured.cover"
          :alt="featured.coverAlt || ''"
          width="1200"
          height="800"
          fetchpriority="high"
        >
        <div v-else class="media-fallback"><SIcon name="lucide:feather" class="size-10" /></div>
      </NuxtLink>
      <div class="journal-featured-copy">
        <h2><NuxtLink :to="featured.path">{{ featured.title }}</NuxtLink></h2>
        <p>{{ featured.description }}</p>
        <p class="mt-5 flex items-center gap-2 text-[0.9375rem] text-[var(--selaras-resolved-text-muted)]">
          <span>{{ featured.category }}</span>
          <template v-if="featured.readingTime">
            <span aria-hidden="true">·</span>
            <span>{{ featured.readingTime }}</span>
          </template>
        </p>
        <div class="journal-featured-footer">
          <ArticleByline :author="featured.author" :date="featured.date" />
          <SButton :to="featured.path" variant="outline" color="neutral" trailing-icon="lucide:arrow-up-right" class="bg-[var(--selaras-resolved-surface-elevated)]">Read article</SButton>
        </div>
      </div>
    </div>

    <div v-if="rest.length" class="journal-archive">
      <div class="journal-archive-heading">
        <h2>All notes</h2>
        <span>{{ rest.length }} {{ rest.length === 1 ? 'article' : 'articles' }}</span>
      </div>
      <div class="journal-archive-grid">
        <JournalCard v-for="post in rest" :key="post.path" :post="post" />
      </div>
    </div>

    <SCard v-else-if="!featured" class="mt-12">
      <template #header>
        <h2 class="font-semibold">No journal entries yet</h2>
      </template>
      <p class="text-sm text-[var(--selaras-resolved-text-muted)]">
        Add a Markdown file to <code>content/journal/</code> to publish your first note.
      </p>
    </SCard>

    <p
      v-if="featured || rest.length"
      class="mt-20 animate-editorial-rise text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)] sm:mt-24"
    >
      Cover photography — chrisinno, Defi22, Midori and RasyaAbhirama13, via
      Wikimedia Commons (CC BY / CC BY-SA); each article credits its image.
      Swap the demo photographs for your own before publishing.
    </p>
  </SContainer>
</template>
