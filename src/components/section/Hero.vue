<template>
  <Section id="hero" class="hero" aria-labelledby="hero-title">
    <div class="hero-content">
      <div class="hero-badge">Senior Frontend Developer</div>

      <h1 id="hero-title" class="hero-title">Данил Чугаев</h1>

      <p class="hero-subtitle">
        10+ лет опыта • Эксперт Vue 3 / Nuxt 4 / TypeScript
      </p>

      <div class="hero-highlights">
        <div class="highlight-item">
          <span class="accent">LCP</span> ×2 ускорение
        </div>
        <div class="highlight-item"><span class="accent">DAU</span> +18%</div>
        <div class="highlight-item">MTTR 3ч → 20мин</div>
      </div>

      <div class="hero-buttons">
        <a
          href="#projects"
          class="btn primary"
          @click.prevent="$emit('scrollToSection', 'projects')"
        >
          Смотреть проекты
        </a>

        <a
          href="#about"
          class="btn"
          @click.prevent="$emit('scrollToSection', 'about')"
        >
          Обо мне
        </a>

        <a
          href="https://github.com/DanilChugaev"
          target="_blank"
          rel="noopener noreferrer"
          class="btn"
        >
          GitHub
        </a>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/components/layout/Section.vue';
import type { SectionIdType } from '@/types.ts';

defineEmits<{
  scrollToSection: [SectionIdType];
}>();
</script>

<style scoped lang="postcss">
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 820px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-block;
  background: rgba(0, 102, 255, 0.15);
  color: #0066ff;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 102, 255, 0.3);
}

.hero-title {
  font-size: 4.2rem;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.45rem;
  color: #b0b0b0;
  margin-bottom: 40px;
  line-height: 1.4;
}

.hero-highlights {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.highlight-item {
  background: #1e1e1e;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
}

.accent {
  color: var(--accent);
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 14px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
  border: 2px solid #444;
  color: var(--text);
}

.btn:hover {
  border-color: var(--accent);
  color: white;
}

.btn.primary {
  background: var(--accent);
  color: white;
  border-color: var(--accent);
}

.btn.primary:hover {
  background: #0052cc;
  transform: translateY(-3px);
}
</style>
