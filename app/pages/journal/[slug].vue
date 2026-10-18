<script setup lang="ts">
import { proseComponents } from '~/utils/editorial'

const route = useRoute()
const { data: post } = await useAsyncData(`journal-${route.params.slug}`, () => {
  return queryCollection('journal').path(`/journal/${route.params.slug}`).first()
})

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Journal entry not found', fatal: true })
}

const current = post.value

const { data: adjacent } = await useAsyncData(`journal-${current.path}-adjacent`, () => {
  return Promise.all([
    queryCollection('journal').where('date', '<', current.date).order('date', 'DESC').first(),
    queryCollection('journal').where('date', '>', current.date).order('date', 'ASC').first(),
  ])
})

const previous = computed(() => adjacent.value?.[0])
const next = computed(() => adjacent.value?.[1])

const tocLinks = computed(() => post.value?.body?.toc?.links ?? [])

useSeoMeta({
  title: () => post.value?.title,
  description: () => post.value?.description,
  ogImage: () => post.value?.cover,
  ogType: 'article',
})
</script>

<template>
  <article v-if="post">
    <SContainer class="pt-8 sm:pt-10">
      <div class="mx-auto flex max-w-3xl flex-col items-center">
        <SButton
          variant="outline"
          color="neutral"
          size="sm"
          icon="lucide:arrow-left"
          class="animate-editorial-rise bg-[var(--selaras-resolved-surface-elevated)]"
          @click="navigateTo('/journal')"
        >
          The journal
        </SButton>

        <header class="mt-12 text-center sm:mt-14">
          <h1 class="mt-5 animate-editorial-rise text-balance text-[2.4rem] leading-[0.94] tracking-[-0.055em] [animation-delay:60ms] sm:text-6xl lg:text-7xl">
            {{ post.title }}
          </h1>
          <p
            v-if="post.description"
            class="mx-auto mt-5 animate-editorial-rise text-[1.05rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]"
          >
            {{ post.description }}
          </p>
          <ArticleMeta
            :category="post.category"
            :date="post.date"
            :reading-time="post.readingTime"
            class="mt-6 animate-editorial-rise justify-center [animation-delay:140ms]"
          />
          <ArticleByline :author="post.author" class="mt-4 animate-editorial-rise justify-center [animation-delay:180ms]" />
        </header>
      </div>

      <figure v-if="post.cover" class="mt-12 sm:mt-16">
        <img
          :src="post.cover"
          :alt="post.coverAlt || ''"
          width="1600"
          height="900"
          fetchpriority="high"
          class="aspect-[4/3] w-full animate-editorial-rise bg-[var(--selaras-resolved-surface-elevated)] object-cover [animation-delay:220ms] sm:aspect-[16/9]"
        >
        <figcaption
          v-if="post.coverAlt"
          class="mt-3 animate-editorial-rise text-center text-[0.8125rem] text-[var(--selaras-resolved-text-muted)] [animation-delay:280ms]"
        >
          {{ post.coverAlt }}
        </figcaption>
      </figure>
    </SContainer>

    <SContainer class="pb-20 sm:pb-28">
      <div class="mt-12 flex flex-col items-center gap-10 sm:mt-16 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
        <ArticleToc
          v-if="tocLinks.length > 1"
          :links="tocLinks"
          class="animate-editorial-rise [animation-delay:260ms]"
        />
        <ContentRenderer
          :value="post"
          :components="proseComponents"
          class="selaras-prose min-w-0 max-w-[42rem] animate-editorial-rise text-[1.0625rem] leading-[1.8] [animation-delay:200ms]"
        />
      </div>

      <PostNavigation :previous="previous" :next="next" />
    </SContainer>
  </article>
</template>
