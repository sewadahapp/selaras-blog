<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-index', () => {
  return queryCollection('projects').order('year', 'DESC').all()
})

useSeoMeta({
  title: 'Projects · Naya Arunika',
  description: 'Selected sound, performance, and visual projects by Naya Arunika.',
})
</script>

<template>
  <SContainer class="pb-20 sm:pb-28">
    <header class="pt-12 sm:pt-16">
      <h1 class="max-w-[16ch] animate-editorial-rise text-[clamp(3rem,6.5vw,6rem)] leading-[0.9] tracking-[-0.07em]">
        Sound in other forms.
      </h1>
      <p class="mt-6 max-w-[36rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]">
        Installations, film scores, and live performances — the work that happens
        outside the record. One at a time, the way it was made.
      </p>
    </header>

    <div v-if="projects?.length" class="mt-16 flex flex-col sm:mt-20">
      <section
        v-for="(project, i) in projects"
        :key="project.path"
        class="mt-24 first:mt-0 sm:mt-28"
        :aria-labelledby="`project-${i}-title`"
      >
        <div class="flex flex-wrap items-start justify-between gap-x-10 gap-y-3">
          <h2
            :id="`project-${i}-title`"
            class="max-w-[18ch] animate-editorial-rise text-[clamp(2.2rem,4.5vw,4.2rem)] leading-[0.95] tracking-[-0.055em]"
          >
            <NuxtLink :to="project.path" class="transition-colors hover:text-[var(--selaras-resolved-color-primary-text)]">
              {{ project.title }}
            </NuxtLink>
          </h2>
          <p class="text-[1rem] text-[var(--selaras-resolved-text-muted)] sm:sm-right sm:text-right">
            <span>{{ project.projectType }}</span>
            <span aria-hidden="true"> · </span>
            <span>{{ project.year }}</span>
            <template v-if="project.collaborator">
              <span aria-hidden="true"> · </span>
              <span>with {{ project.collaborator }}</span>
            </template>
          </p>
        </div>

        <p class="mt-4 max-w-[40rem] animate-editorial-rise text-[1.0625rem] leading-[1.75] [animation-delay:80ms]">
          {{ project.description }}
        </p>

        <figure v-if="project.cover" class="mt-8 animate-editorial-rise [animation-delay:140ms]">
          <NuxtLink :to="project.path" class="media-link block" :aria-label="`Read about ${project.title}`">
            <img
              :src="project.cover"
              :alt="project.coverAlt || ''"
              width="1920"
              height="816"
              fetchpriority="high"
              class="aspect-[4/3] w-full bg-[var(--selaras-resolved-surface-elevated)] object-cover sm:aspect-[21/9]"
            >
          </NuxtLink>
          <figcaption class="mt-3 text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)]">
            {{ project.coverAlt }}
          </figcaption>
        </figure>

        <div class="mt-6 animate-editorial-rise text-[1rem] text-[var(--selaras-resolved-text-muted)] [animation-delay:200ms]">
          {{ project.role }}
        </div>
      </section>
    </div>

    <SCard v-else class="mt-16">
      <template #header>
        <h2 class="font-semibold">No projects yet</h2>
      </template>
      <p class="text-sm text-[var(--selaras-resolved-text-muted)]">
        Add a Markdown file to <code>content/projects/</code> to publish a project.
      </p>
    </SCard>

    <section v-if="projects?.length" class="mt-20 sm:mt-28" aria-labelledby="projects-journal-cta">
      <figure class="animate-editorial-rise">
        <img
          src="/images/commuter-line-bandung-raya-in-gedebage-station.jpg"
          alt="A commuter train waiting under the lights of Gedebage Station at night"
          width="1920"
          height="816"
          loading="lazy"
          class="aspect-[4/3] w-full bg-[var(--selaras-resolved-surface-elevated)] object-cover sm:aspect-[21/9]"
        >
        <figcaption class="mt-3 text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)]">
          Most of these pieces surfaced in the journal first. Photograph by NFarras, CC BY-SA 4.0.
        </figcaption>
      </figure>
      <div class="mt-8 flex animate-editorial-rise flex-col items-start justify-between gap-5 [animation-delay:120ms] sm:flex-row sm:items-center">
        <h2 id="projects-journal-cta" class="text-[clamp(1.8rem,3.5vw,3rem)] leading-none tracking-[-0.06em]">
          The rest is in the notebook.
        </h2>
        <SButton to="/journal" variant="outline" color="neutral" trailing-icon="lucide:arrow-up-right">
          Into the journal
        </SButton>
      </div>
    </section>
  </SContainer>
</template>
