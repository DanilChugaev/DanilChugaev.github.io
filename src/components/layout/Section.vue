<template>
  <section class="section" :id :aria-labelledby="title ? titleId : undefined">
    <div class="container">
      <h2 v-if="title" :id="titleId" class="section__title">{{ title }}</h2>

      <slot name="default" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { SectionIdType } from '@/types.ts';

const props = defineProps<{
  id: SectionIdType;
  title?: string;
}>();

const titleId = `${props.id}-title`;
</script>

<style scoped lang="postcss">
.section {
  &__title {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 60px;
  }
}
</style>
