<template>
  <div class="filter-group">
    <h3 :id="`filter-${name}`">{{ label }}</h3>
    <div
      class="filter-buttons"
      role="radiogroup"
      :aria-labelledby="`filter-${name}`"
    >
      <input
        v-model="modelValue"
        type="radio"
        :id="`filter-${name}-all`"
        :name="`filter-${name}`"
        value="all"
      />

      <label
        :for="`filter-${name}-all`"
        :class="{ active: modelValue === 'all' }"
      >
        Все
      </label>

      <input
        v-for="option in options"
        :key="option.value"
        v-model="modelValue"
        type="radio"
        :id="`filter-${name}-${option.value}`"
        :name="`filter-${name}`"
        :value="option.value"
      />

      <label
        v-for="option in options"
        :for="`filter-${name}-${option.value}`"
        :class="{ active: modelValue === option.value }"
        :key="option.value"
      >
        {{ option.label }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FilterOption } from '@/types.ts';

defineProps<{
  name: string;
  label: string;
  options: FilterOption<string | number>[];
}>();

const modelValue = defineModel<string | number>();
</script>

<style scoped lang="postcss">
.filter-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 24px;
}

.filter-group h3 {
  color: #ddd;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.filter-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.filter-buttons input[type='radio'] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
  width: 0;
  height: 0;
}

.filter-buttons label {
  padding: 10px 20px;
  background: #1e1e1e;
  border: 1px solid #333;
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.filter-buttons label.active,
.filter-buttons label:hover {
  background: #0066ff;
  border-color: #0066ff;
  color: white;
}

@media (max-width: 768px) {
  .filter-buttons {
    width: 100%;
  }
}
</style>
