<template>
  <Section id="projects" title="Проекты" class="projects-section">
    <div class="featured-projects">
      <h3 class="projects-subtitle">Избранные проекты</h3>
      <p class="projects-intro">
        Пять публичных работ, которые лучше всего показывают мой технический
        подход и разнообразие инженерных задач
      </p>

      <div class="projects-grid featured-projects-grid">
        <Card
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
          featured
        />
      </div>
    </div>

    <div class="all-projects">
      <h3 class="projects-subtitle">Все проекты</h3>
      <div class="filters" role="group" aria-label="Фильтры проектов">
        <!-- Фильтр по году -->
        <FilterGroup
          v-model="selectedYears"
          name="year"
          label="Год"
          :options="yearOptions"
        />

        <!-- Фильтр по типу -->
        <FilterGroup
          v-model="selectedTypes"
          name="type"
          label="Тип проекта"
          :options="typeOptions"
        />

        <!-- Фильтр по технологиям -->
        <FilterGroup
          v-model="selectedTechnologies"
          name="technology"
          label="Технологии"
          :options="technologyOptions"
        />
      </div>

      <div v-show="hasVisibleProjects" class="projects-grid">
        <Card
          v-for="project in sortedProjects"
          v-show="isVisible[project.id]"
          :key="project.id"
          :project="project"
        />
      </div>

      <div v-show="!hasVisibleProjects" class="projects-empty">Нет таких</div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/components/layout/Section.vue';
import { computed } from 'vue';
import { useProjectFilter } from '@/composables/useProjectFilter';
import Card from '@/components/project/Card.vue';
import FilterGroup from '@/components/project/FilterGroup.vue';
import type { FilterOption } from '@/types.ts';
import { projects } from '@/data/projects';

const FEATURED_PROJECT_IDS = [11, 10, 16, 9, 15] as const;

const {
  selectedYears,
  selectedTypes,
  selectedTechnologies,
  uniqueYears,
  uniqueTechnologies,
  sortedProjects,
  isVisible,
  hasVisibleProjects,
} = useProjectFilter();

const featuredProjects = computed(() =>
  FEATURED_PROJECT_IDS.map(id =>
    projects.find(project => project.id === id),
  ).filter(
    (project): project is (typeof projects)[number] => project !== undefined,
  ),
);

const yearOptions = computed<FilterOption<number>[]>(() =>
  uniqueYears.value.map(year => ({
    value: year,
    label: String(year),
  })),
);

const typeOptions: FilterOption[] = [
  { value: 'service', label: 'Сервисы' },
  { value: 'test', label: 'Тестовые' },
  { value: 'game', label: 'Игры' },
  { value: 'other', label: 'Другое' },
];

const technologyOptions = computed<FilterOption[]>(() =>
  uniqueTechnologies.value.map(tech => ({
    value: tech,
    label: tech,
  })),
);
</script>

<style scoped lang="postcss">
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

.featured-projects {
  margin-bottom: 100px;
}

.projects-subtitle {
  margin-bottom: 16px;
  color: var(--text-link-hover);
  font-size: 1.75rem;
}

.projects-intro {
  margin-bottom: 32px;
  color: var(--text-secondary);
}

.featured-projects-grid {
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
}

.projects-empty {
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}
</style>
