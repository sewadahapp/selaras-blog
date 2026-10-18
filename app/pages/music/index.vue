<script setup lang="ts">
import { formatDate } from '~/utils/editorial'

const { data: releases } = await useAsyncData('music-index', () => {
  return queryCollection('music').order('releaseDate', 'DESC').all()
})

function trackCount(release: NonNullable<typeof releases.value>[number]) {
  const n = release.tracks?.length ?? 0
  return `${n} ${n === 1 ? 'track' : 'tracks'}`
}

useSeoMeta({
  title: 'Music · Naya Arunika',
  description: 'Releases, tracks, and collaborations by Naya Arunika.',
})
</script>

<template>
  <SContainer class="pb-20 sm:pb-28">
    <header class="grid gap-6 pt-12 sm:pt-16 sm:gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
      <h1 class="max-w-[14ch] animate-editorial-rise text-[clamp(3rem,6.5vw,6rem)] leading-[0.9] tracking-[-0.07em]">
        Songs for the in-between.
      </h1>
      <p class="max-w-[30rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]">
        Ambient electronics, intimate songwriting, and field recordings from the
        spaces around us — everything released so far, oldest shelf to newest.
      </p>
    </header>

    <div v-if="releases?.length" class="mt-16 flex flex-col sm:mt-20">
      <section
        v-for="release in releases"
        :key="release.path"
        class="mt-20 first:mt-0 sm:mt-24"
        :aria-labelledby="`release-${release.path.replace(/\\W+/g, '-')}-title`"
      >
        <div class="grid gap-8 lg:grid-cols-[minmax(15rem,20rem)_1fr] lg:gap-12">
          <figure class="animate-editorial-rise">
            <NuxtLink :to="release.path" class="media-link block" :aria-label="`Open the record ${release.title}`">
              <img
                v-if="release.cover"
                :src="release.cover"
                :alt="release.coverAlt || ''"
                width="640"
                height="640"
                fetchpriority="high"
                class="aspect-square w-full bg-[var(--selaras-resolved-surface-elevated)] object-cover"
              >
            </NuxtLink>
          </figure>

          <div class="flex flex-col items-start">
            <h2
              :id="`release-${release.path.replace(/\\W+/g, '-')}-title`"
              class="max-w-[16ch] animate-editorial-rise text-[clamp(2.2rem,4.5vw,4rem)] leading-[0.95] tracking-[-0.055em]"
            >
              <NuxtLink :to="release.path" class="transition-colors hover:text-[var(--selaras-resolved-color-primary-text)]">
                {{ release.title }}
              </NuxtLink>
            </h2>
            <p class="mt-4 animate-editorial-rise text-[1rem] text-[var(--selaras-resolved-text-muted)] [animation-delay:80ms]">
              <span>{{ release.releaseType }}</span>
              <span aria-hidden="true"> · </span>
              <time>{{ formatDate(release.releaseDate) }}</time>
              <span aria-hidden="true"> · </span>
              <span>{{ trackCount(release) }}</span>
            </p>
            <p class="mt-5 max-w-[40rem] animate-editorial-rise text-[1.0625rem] leading-[1.75] [animation-delay:140ms]">
              {{ release.description }}
            </p>
            <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-editorial-rise text-[0.9375rem] [animation-delay:200ms]">
              <NuxtLink
                :to="release.path"
                class="group inline-flex items-center gap-1.5 font-medium transition-colors hover:text-[var(--selaras-resolved-color-primary-text)]"
              >
                Open the record
                <Icon name="lucide:arrow-right" class="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </NuxtLink>
              <a
                v-if="release.spotifyUrl"
                :href="release.spotifyUrl"
                external
                rel="noopener"
                target="_blank"
                class="inline-flex items-center gap-1.5 text-[var(--selaras-resolved-text-muted)] transition-colors hover:text-[var(--selaras-resolved-text-default)]"
              >
                Spotify
                <Icon name="lucide:arrow-up-right" class="size-4" aria-hidden="true" />
              </a>
              <a
                v-if="release.bandcampUrl"
                :href="release.bandcampUrl"
                external
                rel="noopener"
                target="_blank"
                class="inline-flex items-center gap-1.5 text-[var(--selaras-resolved-text-muted)] transition-colors hover:text-[var(--selaras-resolved-text-default)]"
              >
                Bandcamp
                <Icon name="lucide:arrow-up-right" class="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>

    <SCard v-else class="mt-16">
      <template #header>
        <h2 class="font-semibold">No releases yet</h2>
      </template>
      <p class="text-sm text-[var(--selaras-resolved-text-muted)]">
        Add a Markdown file to <code>content/music/</code> to publish a release.
      </p>
    </SCard>

    <section v-if="releases?.length" class="mt-24 sm:mt-28" aria-labelledby="music-projects-cta">
      <figure class="animate-editorial-rise">
        <NuxtLink to="/projects" class="media-link block" aria-label="See the projects beyond the records">
          <img
            src="/images/night-at-asia-afrika-street-bandung.jpg"
            alt="Asia-Afrika street in Bandung at night, lights reflecting on the pavement"
            width="1920"
            height="816"
            loading="lazy"
            class="aspect-[4/3] w-full bg-[var(--selaras-resolved-surface-elevated)] object-cover sm:aspect-[21/9]"
          >
        </NuxtLink>
        <figcaption class="mt-3 text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)]">
          Most records here begin as a recording of the street outside the studio.
        </figcaption>
      </figure>
      <div class="mt-8 flex animate-editorial-rise flex-col items-start justify-between gap-5 [animation-delay:120ms] sm:flex-row sm:items-center">
        <h2 id="music-projects-cta" class="text-[clamp(1.8rem,3.5vw,3rem)] leading-none tracking-[-0.06em]">
          The records are only half of it.
        </h2>
        <SButton to="/projects" variant="outline" color="neutral" trailing-icon="lucide:arrow-up-right">
          Beyond the records
        </SButton>
      </div>
    </section>

    <p class="mt-16 text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)]">
      Photography — Defi22, NFarras and RasyaAbhirama13 (CC BY-SA 4.0);
      NGC 3368 ESO by ESO/Oleg Maliy (CC BY 3.0), via Wikimedia Commons.
    </p>
  </SContainer>
</template>
