<script setup lang="ts">
import { proseComponents, formatDate } from '~/utils/editorial'

const route = useRoute()
const { data: release } = await useAsyncData(`music-${route.params.slug}`, () => {
  return queryCollection('music').path(`/music/${route.params.slug}`).first()
})

if (!release.value) {
  throw createError({ statusCode: 404, statusMessage: 'Release not found', fatal: true })
}

const current = release.value

const { data: adjacent } = await useAsyncData(`music-${current.path}-adjacent`, () => {
  return Promise.all([
    queryCollection('music').where('releaseDate', '<', current.releaseDate).order('releaseDate', 'DESC').first(),
    queryCollection('music').where('releaseDate', '>', current.releaseDate).order('releaseDate', 'ASC').first(),
  ])
})

const previous = computed(() => adjacent.value?.[0])
const next = computed(() => adjacent.value?.[1])

const tracks = computed(() => release.value?.tracks ?? [])
const trackLabel = computed(() => {
  const n = tracks.value.length
  return `${n} ${n === 1 ? 'track' : 'tracks'}`
})

useSeoMeta({
  title: () => release.value?.title,
  description: () => release.value?.description,
  ogImage: () => release.value?.cover,
})
</script>

<template>
  <article v-if="release">
    <SContainer class="pt-8 sm:pt-10">
      <div>
        <SButton
          variant="outline"
          color="neutral"
          size="sm"
          icon="lucide:arrow-left"
          class="animate-editorial-rise bg-[var(--selaras-resolved-surface-elevated)]"
          @click="navigateTo('/music')"
        >
          Music
        </SButton>
      </div>

      <div class="mt-12 grid gap-8 sm:mt-16 lg:grid-cols-[minmax(16rem,22rem)_1fr] lg:gap-14">
        <figure v-if="release.cover" class="animate-editorial-rise [animation-delay:120ms]">
          <img
            :src="release.cover"
            :alt="release.coverAlt || ''"
            width="640"
            height="640"
            fetchpriority="high"
            class="aspect-square w-full bg-[var(--selaras-resolved-surface-elevated)] object-cover"
          >
          <figcaption
            v-if="release.coverAlt"
            class="mt-3 text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)]"
          >
            {{ release.coverAlt }}
          </figcaption>
        </figure>

        <div class="flex flex-col items-start">
          <h1 class="animate-editorial-rise text-balance text-[2.4rem] leading-[0.94] tracking-[-0.055em] [animation-delay:160ms] sm:text-6xl lg:text-7xl">
            {{ release.title }}
          </h1>
          <p class="mt-5 animate-editorial-rise text-[1rem] text-[var(--selaras-resolved-text-muted)] [animation-delay:220ms]">
            <span>{{ release.releaseType }}</span>
            <span aria-hidden="true"> · </span>
            <time>{{ formatDate(release.releaseDate) }}</time>
            <span aria-hidden="true"> · </span>
            <span>{{ trackLabel }}</span>
          </p>
          <p class="mt-5 max-w-[40rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:280ms]">
            {{ release.description }}
          </p>
          <div
            v-if="release.spotifyUrl || release.bandcampUrl"
            class="mt-8 flex flex-wrap gap-3 animate-editorial-rise [animation-delay:340ms]"
          >
            <SButton
              v-if="release.spotifyUrl"
              :to="release.spotifyUrl"
              external
              icon="lucide:play"
            >
              Listen on Spotify
            </SButton>
            <SButton
              v-if="release.bandcampUrl"
              :to="release.bandcampUrl"
              external
              variant="outline"
              color="neutral"
              class="bg-[var(--selaras-resolved-surface-elevated)]"
            >
              Bandcamp
            </SButton>
          </div>
        </div>
      </div>

      <section v-if="tracks.length" aria-labelledby="track-list-title" class="mt-16 sm:mt-20">
        <div class="mx-auto max-w-[42rem] animate-editorial-rise [animation-delay:400ms]">
          <h2 id="track-list-title" class="text-[clamp(1.6rem,3vw,2.4rem)] leading-none tracking-[-0.055em]">
            Tracks
          </h2>
          <ol
            class="mt-6"
            :class="'flex flex-col'"
          >
            <li
              v-for="(track, index) in tracks"
              :key="track.title"
              class="group -mx-4 flex items-center gap-4 rounded-sm px-4 py-3 transition-colors duration-200 hover:bg-[var(--selaras-resolved-surface-elevated)] focus-visible:bg-[var(--selaras-resolved-surface-elevated)]"
            >
              <span class="w-5 text-[0.8125rem] text-[var(--selaras-resolved-text-muted)]">{{ index + 1 }}</span>
              <span class="flex-1 text-[1rem] leading-6 font-medium">{{ track.title }}</span>
              <span class="text-[0.8125rem] tabular-nums text-[var(--selaras-resolved-text-muted)]">{{ track.duration }}</span>
            </li>
          </ol>
        </div>
      </section>

      <div class="mt-16 flex flex-col items-center sm:mt-20">
        <ContentRenderer
          :value="release"
          :components="proseComponents"
          class="selaras-prose min-w-0 max-w-[42rem] animate-editorial-rise text-[1.0625rem] leading-[1.8]"
        />
      </div>

      <PostNavigation :previous="previous" :next="next" label="More releases" />
    </SContainer>
  </article>
</template>
