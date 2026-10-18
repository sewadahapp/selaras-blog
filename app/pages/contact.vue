<script setup lang="ts">
import { proseComponents } from '~/utils/editorial'

const site = useAppConfig().site

const { data: page } = await useAsyncData('page-contact', () => {
  return queryCollection('content').path('/contact').first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(site.email)
  } catch {
    // Clipboard API needs a secure context; fall back to a plain --
    // selection copy for e.g. plain-HTTP previews.
    const el = document.createElement('textarea')
    el.value = site.email
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    el.remove()
  }
  copied.value = true
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => (copied.value = false), 2000)
}

const facts = [
  { label: 'Replies', value: 'Usually within a few days — quieter when traveling.' },
  { label: 'Time zone', value: 'WIB, UTC+7 — evenings are the good hours.' },
  { label: 'Open to', value: 'Commissions, collaborations, remote mixes, liner notes.' },
]

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>

<template>
  <div v-if="page">
    <SContainer class="pt-10 sm:pt-16">
      <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 class="animate-editorial-rise text-balance text-[clamp(2.9rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.07em]">
          Say hello.
        </h1>
        <p class="mt-6 max-w-[34rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]">
          For bookings, collaborations, commissions, and press — the inbox is
          open, and a human reads it.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3 animate-editorial-rise [animation-delay:160ms]">
          <SButton :to="`mailto:${site.email}`" trailing-icon="lucide:arrow-up-right">
            <span class="hidden sm:inline">{{ site.email }}</span>
            <span class="sm:hidden">Email Naya</span>
          </SButton>
          <SButton
            variant="outline"
            color="neutral"
            :icon="copied ? 'lucide:check' : 'lucide:copy'"
            class="bg-[var(--selaras-resolved-surface-elevated)]"
            @click="copyEmail"
          >
            {{ copied ? 'Copied' : 'Copy email' }}
          </SButton>
        </div>
        <p class="mt-5 animate-editorial-rise text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)] [animation-delay:200ms]">
          Usually replies within a few days — slower when out recording.
        </p>
      </div>

      <figure class="mx-auto mt-12 max-w-5xl animate-editorial-rise [animation-delay:260ms] sm:mt-16">
        <img
          src="/images/rainy-lights.jpg"
          alt="Rain and blurred street lights behind a wet window at night"
          width="1920"
          height="1287"
          loading="lazy"
          class="aspect-[4/3] w-full bg-[var(--selaras-resolved-surface-elevated)] object-cover sm:aspect-[16/9]"
        >
        <figcaption class="mt-3 animate-editorial-rise text-center text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)] [animation-delay:300ms]">
          Rain on the window, the city waiting beyond it. Photograph by Defi22, CC BY-SA 4.0.
        </figcaption>
      </figure>
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
          aria-label="The particulars"
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
        </aside>
      </div>
    </SContainer>

    <section class="bg-[var(--selaras-resolved-surface-elevated)] pb-20 pt-16 sm:pb-24 sm:pt-20" aria-labelledby="contact-next">
      <SContainer>
        <h2 id="contact-next" class="animate-editorial-rise text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.06em]">
          Not ready to write yet?
        </h2>
        <p class="mt-6 max-w-[36rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]">
          The journal is the more honest version of this page — most good
          collaborations there start as small public notes.
        </p>
        <SButton
          to="/journal"
          variant="outline"
          color="neutral"
          trailing-icon="lucide:arrow-up-right"
          class="mt-8 animate-editorial-rise bg-[var(--selaras-resolved-surface-elevated)] [animation-delay:160ms]"
        >
          Read the journal
        </SButton>
      </SContainer>
    </section>
  </div>
</template>
