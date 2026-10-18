<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const site = useAppConfig().site

const status = computed(() => props.error?.status ?? props.error?.statusCode ?? 500)
const isMissing = computed(() => status.value === 404)

const headline = computed(() => (isMissing.value ? '404.' : 'Something came down.'))
const dek = computed(() =>
  isMissing.value
    ? "This page isn't in the notebook — the address may have moved, or was never written."
    : 'An unexpected error interrupted the reading. Nothing was lost; try again from the start.',
)

useSeoMeta({
  title: () => (isMissing.value ? 'Not in the notebook' : 'Something came down'),
  description: () => site.description,
})
</script>

<template>
  <SApp>
    <div class="flex min-h-svh flex-col bg-[var(--selaras-resolved-surface-canvas)] text-[var(--selaras-resolved-text-default)]">
      <SContainer class="py-6">
        <div class="flex items-center justify-between gap-6">
          <NuxtLink
            to="/"
            class="animate-editorial-rise text-[1.0625rem] font-semibold tracking-[-0.02em]"
          >
            {{ site.name }}
          </NuxtLink>
          <p class="animate-editorial-rise text-[0.8125rem] text-[var(--selaras-resolved-text-muted)]">
            {{ status }}
          </p>
        </div>
      </SContainer>

      <SContainer class="flex w-full flex-1 flex-col sm:justify-center">
        <div class="mx-auto flex max-w-3xl flex-col items-center pb-8 text-center sm:pb-4">
          <h1 class="animate-editorial-rise text-balance text-[clamp(2.9rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.07em]">
            {{ headline }}
          </h1>
          <p class="mt-6 max-w-[34rem] animate-editorial-rise text-[1rem] leading-7 text-[var(--selaras-resolved-text-muted)] [animation-delay:100ms]">
            {{ dek }}
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 animate-editorial-rise [animation-delay:160ms]">
            <SButton icon="lucide:arrow-left" @click="() => clearError({ redirect: '/' })">
              Back to the start
            </SButton>
            <SButton
              variant="outline"
              color="neutral"
              trailing-icon="lucide:arrow-up-right"
              class="bg-[var(--selaras-resolved-surface-elevated)]"
              @click="() => clearError({ redirect: '/journal' })"
            >
              Read the journal
            </SButton>
          </div>
          <p class="mt-5 animate-editorial-rise text-[0.8125rem] leading-5 text-[var(--selaras-resolved-text-muted)] [animation-delay:200ms]">
            Everything that exists is one click away — the journal restarts things nicely.
          </p>
        </div>

        <div class="pb-12">
          <SignalWaveform class="h-28 animate-editorial-rise [animation-delay:260ms] sm:h-40" />
        </div>
      </SContainer>
    </div>
  </SApp>
</template>
