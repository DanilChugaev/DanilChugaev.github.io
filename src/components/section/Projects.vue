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

        <div class="filter-summary">
          <span>Найдено: {{ visibleProjectsCount }}</span>
          <button v-if="hasActiveFilters" type="button" @click="resetFilters">
            Сбросить все
          </button>
        </div>
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
  availableYears,
  availableTypes,
  availableTechnologies,
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

function createFilterOptions<T extends string | number>(
  values: readonly T[],
  selectedValues: readonly T[],
  availableValues: ReadonlySet<T>,
): FilterOption<T>[] {
  return values
    .map(value => ({
      value,
      label: String(value),
      disabled: !selectedValues.includes(value) && !availableValues.has(value),
    }))
    .sort((first, second) => {
      const firstSelected = selectedValues.includes(first.value);
      const secondSelected = selectedValues.includes(second.value);

      if (firstSelected !== secondSelected) return firstSelected ? -1 : 1;
      if (first.disabled !== second.disabled) return first.disabled ? 1 : -1;
      return 0;
    });
}

const yearOptions = computed<FilterOption<number>[]>(() =>
  createFilterOptions(
    uniqueYears.value,
    selectedYears.value,
    availableYears.value,
  ),
);

const projectTypeOptions = [
  { value: 'service', label: 'Сервисы' },
  { value: 'test', label: 'Тестовые' },
  { value: 'game', label: 'Игры' },
  { value: 'other', label: 'Другое' },
] as const;

const typeOptions = computed<FilterOption[]>(() =>
  createFilterOptions(
    projectTypeOptions.map(option => option.value),
    selectedTypes.value,
    availableTypes.value,
  ).map(option => ({
    ...option,
    label: projectTypeOptions.find(type => type.value === option.value)!.label,
  })),
);

const technologyOptions = computed<FilterOption[]>(() =>
  createFilterOptions(
    uniqueTechnologies.value,
    selectedTechnologies.value,
    availableTechnologies.value,
  ),
);

const visibleProjectsCount = computed(
  () =>
    sortedProjects.value.filter(project => isVisible.value[project.id]).length,
);

const hasActiveFilters = computed(
  () =>
    selectedYears.value.length > 0 ||
    selectedTypes.value.length > 0 ||
    selectedTechnologies.value.length > 0,
);

function resetFilters() {
  selectedYears.value = [];
  selectedTypes.value = [];
  selectedTechnologies.value = [];
}
</script>

<style scoped lang="postcss">
.filters {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: 20px;
  margin-bottom: 40px;
}

.filter-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 42px;
  margin-left: auto;
  color: var(--text-secondary);
  font-size: 0.95rem;
  white-space: nowrap;
}

.filter-summary button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--accent-bright);
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.filter-summary button:hover {
  color: var(--text-link-hover);
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

@media (max-width: 768px) {
  .filter-summary {
    width: 100%;
    margin-left: 0;
  }
}
</style>
