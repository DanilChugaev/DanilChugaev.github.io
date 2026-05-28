<template>
  <header class="header">
    <div class="container header-inner">
      <div class="logo">
        <a href="/" class="logo-link" aria-label="На главную">Danil Chugaev</a>
      </div>

      <nav
        :class="['nav', { open: isMenuOpen }]"
        aria-label="Основная навигация"
      >
        <a
          v-for="item in navigation"
          :key="item.sectionId"
          :href="`#${item.sectionId}`"
          @click.prevent="
            $emit('scrollToSection', item.sectionId as SectionIdType)
          "
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        class="mobile-menu-btn"
        @click="isMenuOpen = !isMenuOpen"
        :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
        :aria-expanded="isMenuOpen"
      >
        {{ isMenuOpen ? '✕' : '☰' }}
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { navigation } from '@/data/navigation';
import type { SectionIdType } from '@/types.ts';

defineEmits<{
  scrollToSection: [SectionIdType];
}>();

const isMenuOpen = ref(false);
</script>

<style scoped lang="postcss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid #222;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

.logo-link {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
}

.nav a {
  color: #ccc;
  text-decoration: none;
  margin-left: 32px;
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover {
  color: #0066ff;
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .nav {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    background: #0f0f0f;
    padding: 20px;
    gap: 16px;
    border-top: 1px solid #222;
    transform: translateY(-20px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav.open {
    display: flex;
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .mobile-menu-btn {
    display: block;
  }

  .nav a {
    margin-left: 0;
    font-size: 1.1rem;
    padding: 8px 0;
  }
}
</style>
