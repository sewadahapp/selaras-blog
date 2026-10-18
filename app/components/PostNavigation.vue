<script setup lang="ts">
interface NavPost {
  path: string
  title: string
  cover?: string
}

const props = defineProps<{ previous?: NavPost | null, next?: NavPost | null, label?: string }>()

const navLabel = computed(() => props.label || 'More journal entries')
const labelClass = 'inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-[var(--selaras-resolved-text-muted)]'
const titleClass = 'text-lg font-semibold leading-snug tracking-[-0.02em] transition-colors duration-200 group-hover:text-[var(--selaras-resolved-color-primary-text)]'
const thumbClass = 'aspect-[16/10] w-full bg-[var(--selaras-resolved-surface-elevated)] object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100'
</script>

<template>
  <nav v-if="previous || next" :aria-label="navLabel" class="mx-auto mt-16 w-full max-w-[56rem] sm:mt-24">
    <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12">
      <NuxtLink v-if="previous" :to="previous.path" class="group flex animate-editorial-rise flex-col gap-3 [animation-delay:260ms]">
        <img v-if="previous.cover" :src="previous.cover" alt="" width="640" height="400" :class="thumbClass">
        <span :class="labelClass">
          <SIcon name="lucide:arrow-left" class="size-4" />
          Previous
        </span>
        <strong :class="titleClass">{{ previous.title }}</strong>
      </NuxtLink>

      <NuxtLink v-if="next" :to="next.path" class="group flex animate-editorial-rise flex-col gap-3 [animation-delay:320ms] sm:items-end sm:text-right">
        <img v-if="next.cover" :src="next.cover" alt="" width="640" height="400" :class="thumbClass">
        <span :class="labelClass">
          Next
          <SIcon name="lucide:arrow-right" class="size-4" />
        </span>
        <strong :class="titleClass">{{ next.title }}</strong>
      </NuxtLink>
    </div>
  </nav>
</template>
