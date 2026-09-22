<template>
  <Section id="approach" title="Подход к разработке">
    <p class="approach-intro">
      Применяю эти принципы в публичных и коммерческих проектах — от
      проектирования до передачи решения команде.
    </p>

    <div class="approach-grid">
      <article
        v-for="item in approachItems"
        :key="item.title"
        class="approach-card"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/components/layout/Section.vue';

const approachItems = [
  {
    title: 'Эволюция вместо переписывания',
    description:
      'Мигрирую legacy-системы поэтапно: изолирую модули, сохраняю обратную совместимость и не останавливаю развитие продукта.',
  },
  {
    title: 'Производительность измеряется',
    description:
      'Опираюсь на Core Web Vitals, профильрование и размер payload: оптимизирую критический путь, SSR-запросы, рендеринг и загрузку ресурсов.',
  },
  {
    title: 'Качество — часть процесса',
    description:
      'Закладываю строгую типизацию, линтинг, тесты и CI/CD в процесс разработки, чтобы рефакторинг и релизы оставались предсказуемыми.',
  },
  {
    title: 'Компоненты как продукт команды',
    description:
      'Развиваю переиспользуемые компоненты, документацию и Storybook, учитывая доступность, локализацию и единые дизайн-токены.',
  },
  {
    title: 'Автоматизация с проверкой результата',
    description:
      'Использую AI-инструменты и скрипты для рутинных задач, но сохраняю инженерный контроль: проверяю архитектуру, типы, edge cases и тесты.',
  },
  {
    title: 'Знания остаются в команде',
    description:
      'Фиксирую архитектурные решения в документации, провожу воркшопы и code review, чтобы команда могла самостоятельно развивать продукт.',
  },
];
</script>

<style scoped lang="postcss">
.approach-intro {
  max-width: 760px;
  margin: 0 auto 40px;
  color: var(--text-secondary);
  font-size: 1.15rem;
  text-align: center;
}

.approach-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.approach-card {
  padding: 28px;
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: 12px;
}

.approach-card h3 {
  margin-bottom: 12px;
  color: var(--text-link-hover);
  font-size: 1.2rem;
}

.approach-card p {
  color: var(--text-secondary);
}
</style>
