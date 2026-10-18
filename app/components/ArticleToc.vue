<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

defineProps<{ links: TocLink[] }>()
</script>

<template>
  <aside class="hidden w-56 shrink-0 self-start lg:sticky lg:top-6 lg:block" aria-label="Table of contents">
    <SContentToc :links="links" title="On this page" />
  </aside>
</template>
