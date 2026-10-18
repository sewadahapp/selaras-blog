<script setup lang="ts">
import { proseComponents } from '~/utils/editorial'

const route = useRoute()
const { data: project } = await useAsyncData(`project-${route.params.slug}`, () => {
  return queryCollection('projects').path(`/projects/${route.params.slug}`).first()
})

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const current = project.value

const { data: adjacent } = await useAsyncData(`project-${current.path}-adjacent`, () => {
  return Promise.all([
    queryCollection('projects').where('year', '<', current.year).order('year', 'DESC').first(),
    queryCollection('projects').where('year', '>', current.year).order('year', 'ASC').first(),
  ])
})

const previous = computed(() => adjacent.value?.[0])
const next = computed(() => adjacent.value?.[1])

const tocLinks = computed(() => project.value?.body?.toc?.links ?? [])

useSeoMeta({
  title: () => project.value?.title,
  description: () => project.value?.description,
  ogImage: () => project.value?.cover,
})
</script>

<template>
  <article v-if="project">
    <SContainer class="pt-8 sm:pt-10">
      <div class="mx-auto flex max-w-3xl flex-col items-center">
        <SButton
          variant="outline"
          color="neutral"
          size="sm"
          icon="lucide:arrow-left"
          class="animate-editorial-rise bg-[var(--selaras-resolved-surface-elevated)]"
          @click="navigateTo('/projects')"
        >
          Projects
        </SButton>

        <header class="mt-12 text-center sm:mt-14">
          <h1 class="animate-editorial-rise text-balance text-[2.4rem] leading-[0.94] tracking-[-0.055em] [animation-delay:60ms] sm:text-6xl lg:text-7xl">
            {{ project.title }}
          </h1>
          <p class="mt-5 animate-editorial-rise text-[0.95rem] leading-6 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]">
            {{ project.projectType }} · {{ project.year }} · {{ project.role }}
          </p>
          <p class="mx-auto mt-4 max-w-[42rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:130ms]">
            {{ project.description }}
          </p>
        </header>
      </div>

      <figure v-if="project.cover" class="mt-12 sm:mt-16">
        <img
          :src="project.cover"
          :alt="project.coverAlt || ''"
          width="1920"
          height="816"
          fetchpriority="high"
          class="aspect-[4/3] w-full animate-editorial-rise bg-[var(--selaras-resolved-surface-elevated)] object-cover [animation-delay:200ms] sm:aspect-[21/9]"
        >
        <figcaption
          v-if="project.coverAlt"
          class="mt-3 animate-editorial-rise text-center text-[0.8125rem] text-[var(--selaras-resolved-text-muted)] [animation-delay:260ms]"
        >
          {{ project.coverAlt }}
        </figcaption>
      </figure>
    </SContainer>

    <SContainer class="pb-20 sm:pb-28">
      <div class="mt-12 flex flex-col items-center gap-10 sm:mt-16 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
        <ArticleToc
          v-if="tocLinks.length > 1"
          :links="tocLinks"
          class="animate-editorial-rise [animation-delay:240ms]"
        />
        <ContentRenderer
          :value="project"
          :components="proseComponents"
          class="selaras-prose min-w-0 max-w-[42rem] animate-editorial-rise text-[1.0625rem] leading-[1.8] [animation-delay:200ms]"
        />
      </div>

      <div
        v-if="project.collaborator"
        class="mx-auto mt-14 flex max-w-[42rem] animate-editorial-rise items-center gap-4 [animation-delay:840ms]"
      >
        <SAvatar
          :text="project.collaborator.split(' ').map((word: string) => word.charAt(0)).join('').slice(0, 2).toUpperCase()"
          :name="project.collaborator"
        />
        <div>
          <p class="text-[1rem] leading-6">Made with {{ project.collaborator }}</p>
          <p class="text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)]">
            {{ project.role }} · {{ project.projectType }}, {{ project.year }}
          </p>
        </div>
      </div>

      <PostNavigation :previous="previous" :next="next" label="More projects" />
    </SContainer>
  </article>
</template>
