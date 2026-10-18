<script setup lang="ts">
import { proseComponents } from '~/utils/editorial'

const site = useAppConfig().site

const { data: page } = await useAsyncData('page-about', () => {
  return queryCollection('content').path('/about').first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: projects } = await useAsyncData('about-projects', () => {
  return queryCollection('projects').order('year', 'DESC').limit(3).all()
})

const facts = [
  { label: 'Base', value: 'Bandung, Indonesia — a home studio in the Dago hills.' },
  { label: 'Works with', value: 'Field recordings, a semi-modular synth, a close-mic’d voice.' },
  { label: 'Writes about', value: 'Small sounds, slow process, and the city after dark.' },
]

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <SContainer class="pt-10 sm:pt-16">
      <section class="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <div>
          <h1 class="text-balance text-[clamp(2.9rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.07em] animate-editorial-rise">
            The person behind the sound.
          </h1>
          <p class="mt-6 max-w-[34rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]">
            {{ site.name }} is an independent musician and producer in Bandung, Indonesia — working with the small sounds the city gives away for free.
          </p>
          <ArticleByline :author="site.name" class="mt-8 animate-editorial-rise [animation-delay:160ms]" />
        </div>
        <figure class="animate-editorial-rise [animation-delay:220ms]">
          <img
            src="/images/bukit-bandung-moko.jpg"
            alt="Bandung's city lights seen from the hills above the city at night"
            width="1920"
            height="1277"
            fetchpriority="high"
            class="aspect-[4/3] w-full bg-[var(--selaras-resolved-surface-elevated)] object-cover sm:aspect-[5/6]"
          >
          <figcaption class="mt-3 text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)]">
            Bandung after dark, seen from the hills. Photograph by Farid Rafif, CC BY-SA 4.0.
          </figcaption>
        </figure>
      </section>
    </SContainer>

    <SContainer class="mt-16 sm:mt-24">
      <SignalWaveform class="animate-editorial-rise [animation-delay:120ms]" />
    </SContainer>

    <SContainer class="pb-20 sm:pb-28">
      <div class="mt-12 flex flex-col gap-12 sm:mt-16 lg:flex-row lg:items-start lg:justify-between lg:gap-20">
        <ContentRenderer
          :value="page"
          :components="proseComponents"
          class="selaras-prose w-full max-w-[42rem] animate-editorial-rise text-[1.0625rem] leading-[1.8] [animation-delay:200ms]"
        />

        <aside
          class="flex w-full max-w-[24rem] animate-editorial-rise flex-col items-start gap-12 self-start [animation-delay:260ms] lg:sticky lg:top-28 lg:w-72 lg:shrink-0"
          aria-label="Naya at a glance"
        >
          <dl class="flex flex-col gap-9">
            <div
              v-for="(fact, i) in facts"
              :key="fact.label"
              class="animate-editorial-rise"
              :style="{ animationDelay: `${300 + i * 80}ms` }"
            >
              <dt class="text-[0.8125rem] font-semibold text-[var(--selaras-resolved-color-primary-text)]">{{ fact.label }}</dt>
              <dd class="mt-2 leading-7">{{ fact.value }}</dd>
            </div>
          </dl>
          <p class="animate-editorial-rise text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)] [animation-delay:560ms]">
            All photographs in this demo are by Wikimedia Commons contributors —
            credited per image under CC BY, CC BY-SA, or CC0. Swap them for
            your own before publishing.
          </p>
        </aside>
      </div>
    </SContainer>

    <SContainer class="py-20 sm:py-24">
      <section aria-labelledby="about-work">
        <div class="flex items-baseline justify-between gap-6">
          <h2 id="about-work" class="animate-editorial-rise text-[clamp(2rem,3.5vw,3.2rem)] leading-none tracking-[-0.06em]">
            Selected work.
          </h2>
          <SButton to="/projects" variant="ghost" color="neutral" class="animate-editorial-rise [animation-delay:80ms]" trailing-icon="lucide:arrow-up-right">
            All projects
          </SButton>
        </div>
        <div class="mt-8 flex flex-col">
          <NuxtLink
            v-for="(project, i) in projects"
            :key="project.path"
            :to="project.path"
            class="group flex items-center justify-between gap-6 py-5 transition-all duration-200 animate-editorial-rise hover:pl-2 focus-visible:pl-2"
            :style="{ animationDelay: `${140 + i * 70}ms` }"
          >
            <span class="text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.05] tracking-[-0.05em] transition-colors group-hover:text-[var(--selaras-resolved-color-primary-text)]">
              {{ project.title }}
            </span>
            <span class="flex items-center gap-4">
              <span class="hidden text-[0.8125rem] text-[var(--selaras-resolved-text-muted)] sm:block">{{ project.projectType }}</span>
              <span class="text-[0.8125rem] text-[var(--selaras-resolved-text-muted)]">{{ project.year }}</span>
              <SIcon
                name="lucide:arrow-up-right"
                class="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </NuxtLink>
        </div>
      </section>
    </SContainer>

    <section class="bg-[var(--selaras-resolved-surface-elevated)] pb-20 pt-16 sm:pb-24 sm:pt-20" aria-labelledby="about-cta">
      <SContainer>
        <h2 id="about-cta" class="animate-editorial-rise text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.06em]">
          Say hello.
        </h2>
        <p class="mt-6 max-w-[36rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]">
          Best reached after dark — for collaborations, field-recorded commissions, or a slow walk with a recorder.
        </p>
        <SButton to="/contact" trailing-icon="lucide:arrow-up-right" class="mt-8 animate-editorial-rise [animation-delay:160ms]">
          Write to Naya
        </SButton>
      </SContainer>
    </section>
  </div>
</template>
