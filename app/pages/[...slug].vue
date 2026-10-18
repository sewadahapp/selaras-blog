<script setup lang="ts">
import { proseComponents } from '~/utils/editorial'
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
  <SContainer v-if="page" size="md" class="py-16 sm:py-24">
    <ContentRenderer
      :value="page"
      :components="proseComponents"
      class="selaras-prose"
    />
  </SContainer>
</template>
