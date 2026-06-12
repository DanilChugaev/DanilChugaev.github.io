<template>
  <Section id="projects" title="Проекты" class="projects-section">
    <div class="filters" role="group" aria-label="Фильтры проектов">
      <!-- Фильтр по году -->
      <FilterGroup
        v-model="selectedYear"
        name="year"
        label="Год"
        :options="yearOptions"
      />

      <!-- Фильтр по типу -->
      <FilterGroup
        v-model="selectedType"
        name="type"
        label="Тип проекта"
        :options="typeOptions"
      />

      <!-- Фильтр по технологиям -->
      <FilterGroup
        v-model="selectedTechnology"
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
  </Section>
</template>

<script setup lang="ts">
import Section from '@/components/layout/Section.vue';
import { computed } from 'vue';
import { useProjectFilter } from '@/composables/useProjectFilter';
import Card from '@/components/project/Card.vue';
import FilterGroup from '@/components/project/FilterGroup.vue';
import type { FilterOption } from '@/types.ts';

const {
  selectedYear,
  selectedType,
  selectedTechnology,
  uniqueYears,
  uniqueTechnologies,
  sortedProjects,
  isVisible,
  hasVisibleProjects,
} = useProjectFilter();

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
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0;
  margin-bottom: 40px;
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
