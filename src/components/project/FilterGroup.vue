<template>
  <div
    ref="filterGroup"
    class="filter-group"
    @focusout="closeOnFocusOut"
    @keydown.escape.stop="closeAndRestoreFocus"
  >
    <span :id="`filter-${name}-label`" class="filter-label">{{ label }}</span>
    <button
      :id="`filter-${name}`"
      ref="trigger"
      class="filter-trigger"
      type="button"
      :aria-expanded="isOpen"
      :aria-controls="`filter-${name}-options`"
      :aria-labelledby="`filter-${name}-label filter-${name}`"
      @click="toggle"
    >
      <span>{{ selectionLabel }}</span>
      <span class="filter-chevron" aria-hidden="true"></span>
    </button>

    <div
      v-if="isOpen"
      :id="`filter-${name}-options`"
      class="filter-options"
      role="group"
      :aria-labelledby="`filter-${name}-label`"
    >
      <label
        v-for="option in options"
        :key="option.value"
        :class="['filter-option', { disabled: option.disabled }]"
      >
        <input
          ref="optionInputs"
          v-model="modelValue"
          type="checkbox"
          :value="option.value"
          :disabled="option.disabled"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import type { FilterOption } from '@/types.ts';

const props = defineProps<{
  name: string;
  label: string;
  options: FilterOption<string | number>[];
}>();

const modelValue = defineModel<(string | number)[]>({ default: () => [] });
const isOpen = ref(false);
const filterGroup = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const optionInputs = ref<HTMLInputElement[]>([]);

const selectionLabel = computed(() => {
  if (modelValue.value.length === 0) return 'Все';
  if (modelValue.value.length > 2) return `Выбрано: ${modelValue.value.length}`;

  return modelValue.value
    .map(value => props.options.find(option => option.value === value)?.label)
    .filter((label): label is string => label !== undefined)
    .join(', ');
});

function closeOnOutsideClick(event: MouseEvent) {
  if (!filterGroup.value?.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

async function toggle() {
  isOpen.value = !isOpen.value;

  if (isOpen.value) {
    await nextTick();
    optionInputs.value.find(input => !input.disabled)?.focus();
  }
}

function closeAndRestoreFocus() {
  isOpen.value = false;
  trigger.value?.focus();
}

function closeOnFocusOut(event: FocusEvent) {
  const nextFocusedElement = event.relatedTarget as Node | null;

  if (nextFocusedElement && !filterGroup.value?.contains(nextFocusedElement)) {
    isOpen.value = false;
  }
}

onMounted(() => document.addEventListener('click', closeOnOutsideClick));
onBeforeUnmount(() =>
  document.removeEventListener('click', closeOnOutsideClick),
);
</script>

<style scoped lang="postcss">
.filter-group {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 190px;
}

.filter-label {
  color: var(--text-about-heading);
  font-size: 0.9rem;
  font-weight: 600;
}

.filter-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 42px;
  padding: 9px 12px;
  background: var(--bg-filter-btn);
  border: 1px solid var(--border-filter-btn);
  border-radius: 8px;
  color: var(--text-filter-btn);
  cursor: pointer;
  font: inherit;
  text-align: left;
}

.filter-trigger[aria-expanded='true'] {
  border-color: var(--border-filter-btn-active);
}

.filter-chevron {
  width: 8px;
  height: 8px;
  margin-left: 12px;
  border-right: 2px solid currentColor;
  border-bottom: 2px solid currentColor;
  transform: rotate(45deg) translateY(-2px);
  transition: transform 0.2s ease;
}

.filter-trigger[aria-expanded='true'] .filter-chevron {
  transform: rotate(225deg) translate(-2px, -2px);
}

.filter-options {
  position: absolute;
  z-index: 10;
  top: calc(100% + 8px);
  left: 0;
  width: max-content;
  min-width: 100%;
  max-width: 280px;
  max-height: 260px;
  padding: 8px;
  overflow-y: auto;
  background: var(--bg-card);
  border: 1px solid var(--border-filter-btn);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 4px;
  color: var(--text-filter-btn);
  cursor: pointer;
}

.filter-option:hover {
  background: var(--bg-card-hover);
}

.filter-option.disabled {
  color: var(--text-muted);
  cursor: not-allowed;
}

.filter-option.disabled:hover {
  background: transparent;
}

.filter-option input {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
}

@media (max-width: 768px) {
  .filter-group {
    width: 100%;
  }
}
</style>
