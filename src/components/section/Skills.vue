<template>
  <Section id="skills" title="Ключевые навыки">
    <div class="skills-grid">
      <div
        class="skill-category"
        v-for="category in skillCategories"
        :key="category.title"
      >
        <h3>{{ category.title }}</h3>
        <div class="skill-tags">
          <span v-for="skill in category.skills" :key="skill">{{ skill }}</span>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/components/layout/Section.vue';
import { coreSkills, instrumentSkills, otherSkills } from '@/data/skills';

const skillCategories = [
  { title: 'Core', skills: coreSkills },
  { title: 'Инструменты и практики', skills: instrumentSkills },
  { title: 'Дополнительно', skills: otherSkills },
];
</script>

<style scoped lang="postcss">
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.skill-category h3 {
  margin-bottom: 16px;
  color: var(--accent);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skill-tags span {
  background: #1e1e1e;
  padding: 10px 18px;
  border-radius: 9999px;
  font-size: 1rem;
}
</style>
