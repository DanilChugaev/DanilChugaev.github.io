<template>
  <div class="project-card">
    <div class="project-image-container">
      <img
        :src="project.image"
        :alt="project.title"
        class="project-image"
        loading="lazy"
      />
      <div class="year-badge">{{ project.year }}</div>
    </div>

    <div class="project-info">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>

      <div class="technologies">
        <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
          {{ tech }}
        </span>
      </div>

      <div class="project-links">
        <a
          v-if="project.github"
          :href="project.github"
          target="_blank"
          rel="noopener noreferrer"
          class="link-btn"
        >
          GitHub
        </a>

        <button v-if="project.demo" class="link-btn primary" @click="openDemo">
          Посмотреть демо
        </button>
      </div>
    </div>

    <DemoModal
      v-if="project.demo"
      v-model:is-open="isModalOpen"
      :demo-url="project.demo"
      :project-title="project.title"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '@/types';
import DemoModal from './DemoModal.vue';

defineProps<{
  project: Project;
}>();

const isModalOpen = ref(false);

function openDemo() {
  isModalOpen.value = true;
}
</script>

<style scoped lang="postcss">
.project-card {
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.3);
}

.project-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.4s ease;
}

.project-card:hover .project-image {
  transform: scale(1.05);
}

.year-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #000;
  color: #fff;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.project-info {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-title {
  margin: 0 0 12px 0;
  font-size: 1.35rem;
  color: #fff;
}

.project-description {
  color: #b3b3b3;
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
}

.technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-tag {
  background: #2a2a2a;
  color: #aaa;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 0.85rem;
}

.project-links {
  display: flex;
  gap: 12px;
  margin-top: auto;
}

.link-btn {
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  border: 1px solid #444;
  color: #ccc;
  cursor: pointer;
}

.link-btn:hover {
  background: #333;
  color: white;
}

.link-btn.primary {
  background: #0066ff;
  border-color: #0066ff;
  color: white;
}

.link-btn.primary:hover {
  background: #0052cc;
}
</style>
