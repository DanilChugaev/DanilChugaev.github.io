<template>
  <a href="#main-content" class="skip-link">Перейти к основному содержимому</a>

  <Header @scroll-to-section="scrollToSection" />

  <main id="main-content" role="main">
    <Hero @scroll-to-section="scrollToSection" />
    <About />
    <Skills />
    <Projects />
    <Contacts />
  </main>

  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Hero from '@/components/section/Hero.vue';
import About from '@/components/section/About.vue';
import Skills from '@/components/section/Skills.vue';
import Projects from '@/components/section/Projects.vue';
import Contacts from '@/components/section/Contacts.vue';
import { useScrollToSection } from '@/composables/useScrollToSection';

const { scrollToSection } = useScrollToSection();
</script>

<style scoped lang="postcss">
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  background: var(--accent);
  color: white;
  padding: 12px 24px;
  z-index: 9999;
  font-weight: 600;
  text-decoration: none;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
</style>
