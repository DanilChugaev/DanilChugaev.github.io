<template>
  <div class="projects-section">
    <div class="filters" role="group" aria-label="Фильтры проектов">
      <!-- Фильтр по году -->
      <div class="filter-group">
        <h3 id="filter-year">Год</h3>
        <div class="filter-buttons" role="group" aria-labelledby="filter-year">
          <button
            :class="{ active: selectedYear === 'all' }"
            @click="selectedYear = 'all'"
          >
            Все
          </button>
          <button
            v-for="year in uniqueYears"
            :key="year"
            :class="{ active: selectedYear === year }"
            @click="selectedYear = year"
          >
            {{ year }}
          </button>
        </div>
      </div>

      <!-- Фильтр по типу -->
      <div class="filter-group">
        <h3 id="filter-type">Тип проекта</h3>
        <div class="filter-buttons" role="group" aria-labelledby="filter-type">
          <button
            :class="{ active: selectedType === 'all' }"
            @click="selectedType = 'all'"
          >
            Все
          </button>
          <button
            :class="{ active: selectedType === 'pet' }"
            @click="selectedType = 'pet'"
          >
            Пет-проекты
          </button>
          <button
            :class="{ active: selectedType === 'test' }"
            @click="selectedType = 'test'"
          >
            Тестовые
          </button>
        </div>
      </div>
    </div>

    <div class="projects-grid">
      <Card
        v-for="project in filteredProjects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectFilter } from '@/composables/useProjectFilter';
import Card from './Card.vue';

const { selectedYear, selectedType, uniqueYears, filteredProjects } =
  useProjectFilter();
</script>

<style scoped lang="postcss">
.filters {
  display: flex;
  gap: 40px;
  margin-bottom: 40px;
}

.filter-group {
  margin-bottom: 24px;
}

.filter-group h3 {
  margin-bottom: 12px;
  color: #ddd;
  font-size: 1.1rem;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-buttons button {
  padding: 10px 20px;
  background: #1e1e1e;
  border: 1px solid #333;
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-buttons button.active,
.filter-buttons button:hover {
  background: #0066ff;
  border-color: #0066ff;
  color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
}
</style>
