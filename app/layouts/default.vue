<script setup lang="ts">
const mobileMenuOpen = ref(false)

const navigation = [
  { label: 'Music', to: '/music' },
  { label: 'Projects', to: '/projects' },
  { label: 'Journal', to: '/journal' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <div class="min-h-screen bg-[var(--selaras-resolved-surface-default)] text-[var(--selaras-resolved-text-default)]">
    <SHeader :ui="{ root: 'border-b border-[var(--selaras-resolved-border-default)]' }">
      <div class="flex items-center gap-6">
        <NuxtLink to="/" class="shrink-0 text-lg font-semibold tracking-tight">
          Naya Arunika
          <span class="sr-only">home</span>
        </NuxtLink>

        <SNavigationMenu
          :items="navigation"
          variant="link"
          highlight
          class="hidden md:flex"
          aria-label="Main navigation"
        />
      </div>

      <template #right>
        <div class="flex items-center gap-2">
          <SColorModeToggle />
          <SButton to="/contact" color="neutral" size="sm" class="hidden sm:inline-flex">
            Get in touch
          </SButton>
          <SButton
            icon="lucide:menu"
            aria-label="Open navigation"
            variant="ghost"
            color="neutral"
            class="md:hidden"
            @click="mobileMenuOpen = true"
          />
        </div>
      </template>
    </SHeader>

    <SDrawer v-model:open="mobileMenuOpen" side="right" title="Navigation">
      <template #body>
        <nav class="flex flex-col gap-2" aria-label="Mobile navigation">
          <SButton
            v-for="item in navigation"
            :key="item.to"
            :to="item.to"
            variant="ghost"
            color="neutral"
            block
            class="justify-start"
            @click="mobileMenuOpen = false"
          >
            {{ item.label }}
          </SButton>
          <SButton
            to="/contact"
            color="neutral"
            block
            class="justify-start"
            @click="mobileMenuOpen = false"
          >
            Get in touch
          </SButton>
        </nav>
      </template>
    </SDrawer>

    <main>
      <slot />
    </main>

    <footer class="site-footer mt-24 border-t border-[var(--selaras-resolved-border-default)]">
      <SContainer>
        <div class="flex flex-col gap-4 py-8 text-sm text-[var(--selaras-resolved-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>Writing, sound, and everything between.</p>
          <p>© {{ new Date().getFullYear() }} Naya Arunika · Built with <a href="https://selarasui.my.id" class="footer-link">Selaras</a></p>
        </div>
      </SContainer>
    </footer>
  </div>
</template>
