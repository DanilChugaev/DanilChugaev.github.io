<template>
  <Section id="about" title="Обо мне">
    <div class="about-grid">
      <div class="about-text">
        <p>
          Senior Frontend Developer с более чем
          <strong>10-летним опытом</strong> разработки высоконагруженных
          веб-приложений. Специализируюсь на Vue 3 / Nuxt 4, TypeScript,
          performance-инжиниринге и миграции legacy-систем без остановки
          бизнеса.
        </p>

        <p>
          Имею сильный опыт технического лидерства: менторинг разработчиков,
          внедрение инженерных практик (Storybook, Vitest, CI/CD, AI-assisted
          development). Достиг измеримых бизнес-результатов: рост DAU на 18%,
          ускорение LCP в 2 раза, снижение MTTR с 3 часов до 20 минут.
        </p>
      </div>

      <div class="about-info">
        <p><strong>Город:</strong> Новосибирск (готов к удалённой работе)</p>
        <p><strong>Опыт:</strong> 10+ лет</p>
        <p><strong>Английский:</strong> B2</p>
        <p><strong>Формат:</strong> Полная занятость, удалённо</p>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/components/layout/Section.vue';
</script>

<style scoped lang="postcss">
.about-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: start;
}

.about-text p {
  font-size: 1.15rem;
  margin-bottom: 20px;
  color: var(--text-secondary);
}

.about-info p {
  font-size: 1.1rem;
  margin-bottom: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.about-info strong {
  color: var(--text);
}
</style>
