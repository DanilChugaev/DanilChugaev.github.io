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
          @click.prevent="scrollToSection(item.sectionId)"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        class="mobile-menu-btn"
        :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <SvgIcon :icon="isMenuOpen ? 'close' : 'menu'" :size="28" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { navigation } from '@/data/navigation';
import type { SectionIdType } from '@/types.ts';
import SvgIcon from '@/icons/SvgIcon.vue';

const emit = defineEmits<{
  scrollToSection: [SectionIdType];
}>();

const isMenuOpen = ref(false);

function scrollToSection(sectionId: SectionIdType) {
  isMenuOpen.value = false;
  emit('scrollToSection', sectionId);
}
</script>

<style scoped lang="postcss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--bg-nav-overlay);
  backdrop-filter: blur(10px);
  z-index: 1000;
  border-bottom: 1px solid var(--border-primary);
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
  color: var(--text-link-hover);
  text-decoration: none;
}

.nav a {
  color: var(--text-filter-btn);
  text-decoration: none;
  margin-left: 32px;
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover {
  color: var(--accent);
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  background: none;
  color: var(--text-link-hover);
  cursor: pointer;
  padding: 4px;
  border: 1px solid var(--border-primary);
  border-radius: 4px;
  width: 40px;
  height: 40px;
  transition: border-color 0.3s;

  &:hover {
    border-color: var(--accent);
  }
}

.mobile-menu-btn :deep(.svg-icon) {
  color: currentColor;
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
    background: var(--bg-primary);
    padding: 20px;
    gap: 16px;
    border-top: 1px solid var(--border-primary);
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
    display: flex;
  }

  .nav a {
    margin-left: 0;
    font-size: 1.1rem;
    padding: 8px 0;
  }
}
</style>
