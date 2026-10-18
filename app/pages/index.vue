<script setup lang="ts">
const site = useAppConfig().site
const { data: posts } = await useAsyncData('home-journal', () => queryCollection('journal').order('date', 'DESC').limit(3).all())
const { data: projects } = await useAsyncData('home-projects', () => queryCollection('projects').order('year', 'DESC').limit(3).all())
const featured = computed(() => posts.value?.[0])
useSeoMeta({ title: 'Writing, sound & everything between', description: site.description })
</script>

<template>
  <div>
    <SContainer>
      <section class="author-hero" aria-labelledby="author-name">
      <div class="hero-intro">
        <p>Independent musician.<br>A curious mind, out loud.</p>
        <p class="hero-location">Writing from {{ site.location }}.<br>Usually after hours.</p>
      </div>
      <h1 id="author-name" class="author-name">{{ site.name }}</h1>
      <div class="hero-bottom"><p>Thoughts on making things,<br>and paying closer attention.</p><SButton to="/journal" trailing-icon="lucide:arrow-down-right">Explore the journal</SButton></div>
      </section>

      <section v-if="featured" class="featured-story" aria-labelledby="featured-title">
      <NuxtLink :to="featured.path" class="featured-image media-link" :aria-label="`Read ${featured.title}`">
        <img :src="featured.cover" :alt="featured.coverAlt || ''" width="1200" height="900" fetchpriority="high">
      </NuxtLink>
      <div class="featured-copy">
        <h2 id="featured-title"><NuxtLink :to="featured.path">{{ featured.title }}</NuxtLink></h2>
        <p>{{ featured.description }}</p>
        <p class="mt-5 flex items-center gap-2 text-[0.9375rem] text-[var(--selaras-resolved-text-muted)]">
          <span>{{ featured.category }}</span>
          <span aria-hidden="true">·</span>
          <span v-if="featured.readingTime">{{ featured.readingTime }}</span>
        </p>
        <ArticleByline :author="site.name" :date="featured.date" class="mt-6" />
        <SButton :to="featured.path" color="neutral" variant="outline" trailing-icon="lucide:arrow-up-right" class="mt-8">Read the story</SButton>
      </div>
      </section>

      <section class="latest-section" aria-labelledby="latest-title">
      <div class="section-heading"><h2 id="latest-title">More from the journal</h2><SButton to="/journal" variant="ghost" color="neutral" trailing-icon="lucide:arrow-up-right">All writing</SButton></div>
      <div class="journal-grid"><JournalCard v-for="post in posts?.slice(1)" :key="post.path" :post="post" /></div>
      </section>
    </SContainer>

    <section class="about-band" aria-labelledby="about-title">
      <SContainer class="about-grid">
      <div><h2 id="about-title">A little about me.</h2><SButton to="/about" variant="outline" color="neutral" trailing-icon="lucide:arrow-up-right">The longer version</SButton></div>
      <div><p class="about-statement">I make music, collect small sounds, and write to make sense of it all.</p><p>Based in Bandung. Somewhere between a notebook and a recording session, this is my corner of the internet — a place for work in progress, lessons learned, and things worth sharing.</p></div>
      </SContainer>
    </section>

    <SContainer>
      <section class="selected-section" aria-labelledby="work-title">
      <div class="section-heading"><h2 id="work-title">Beyond the page</h2></div>
      <NuxtLink v-for="project in projects" :key="project.path" :to="project.path" class="work-row"><span>{{ project.title }}</span><SIcon name="lucide:arrow-up-right" class="size-6" /></NuxtLink>
      <SButton to="/projects" variant="ghost" color="neutral" trailing-icon="lucide:arrow-up-right" class="mt-8">All projects</SButton>
      <figure class="city-figure"><img src="/images/bandung-night-view-dago.jpg" width="1920" height="1278" alt="A hillside terrace overlooking the lights of Bandung" loading="lazy"><figcaption>Somewhere above the noise. Bandung, after dark. Photograph by chrisinno, CC BY 2.0.</figcaption></figure>
      </section>
    </SContainer>
  </div>
</template>
