<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">{{ projectTitle }}</h2>
            <button class="modal-close" @click="close" aria-label="Закрыть">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="!isLoaded" class="preloader">
              <svg class="spinner" viewBox="0 0 50 50">
                <circle
                  class="spinner-path"
                  cx="25"
                  cy="25"
                  r="20"
                  fill="none"
                  stroke-width="5"
                />
              </svg>
            </div>
            <iframe
              :src="demoUrl"
              :key="demoUrl"
              class="modal-iframe"
              @load="onIframeLoad"
              loading="lazy"
              allow="fullscreen"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';

interface Props {
  isOpen: boolean;
  demoUrl: string;
  projectTitle: string;
}

interface Emits {
  (e: 'update:isOpen', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isLoaded = ref(false);

function close() {
  emit('update:isOpen', false);
}

function onIframeLoad() {
  isLoaded.value = true;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isOpen) {
    close();
  }
}

watch(
  () => props.isOpen,
  newValue => {
    if (newValue) {
      isLoaded.value = false;
      document.addEventListener('keydown', onKeydown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', onKeydown);
      document.body.style.overflow = '';
    }
  },
);

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});
</script>

<style scoped lang="postcss">
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-modal-overlay);
  padding: 20px;
}

.modal-content {
  position: relative;
  background: var(--white-modal);
  border-radius: 12px;
  width: 95%;
  max-width: 1200px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: var(--shadow-color);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-medium);
}

.modal-title {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-modal-title);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: var(--text-modal-close);
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.modal-close:hover {
  background: var(--border-medium);
  color: var(--text-link-hover);
}

.modal-body {
  flex: 1;
  overflow: hidden;
}

.modal-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.preloader {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  z-index: 1;
}

.spinner {
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.spinner-path {
  stroke: var(--spinner-color);
  stroke-dasharray: 80;
  stroke-dashoffset: 60;
  stroke-linecap: round;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content {
  transform: scale(0.95);
}
</style>
