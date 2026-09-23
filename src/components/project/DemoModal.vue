<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="close">
        <div
          ref="modalContent"
          class="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
          tabindex="-1"
          @keydown.tab="trapFocus"
        >
          <div class="modal-header">
            <div class="modal-heading">
              <span class="modal-kicker">Демо проекта</span>
              <h2 id="demo-modal-title" class="modal-title">
                {{ projectTitle }}
              </h2>
            </div>
            <div class="modal-actions">
              <a
                :href="demoUrl"
                class="modal-open-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Открыть отдельно
              </a>
              <button
                ref="closeButton"
                class="modal-close"
                @click="close"
                aria-label="Закрыть"
              >
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
          </div>
          <div class="modal-body">
            <div
              v-if="!isLoaded"
              class="preloader"
              role="status"
              aria-live="polite"
            >
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
              <span class="visually-hidden"
                >Загрузка демо {{ projectTitle }}</span
              >
            </div>
            <iframe
              :src="demoUrl"
              :key="demoUrl"
              :title="`Демо проекта ${projectTitle}`"
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
import { nextTick, onBeforeUnmount, ref, watch } from 'vue';

interface Props {
  isOpen: boolean;
  demoUrl: string;
  projectTitle: string;
  returnFocusTo: HTMLButtonElement | null;
}

interface Emits {
  (e: 'update:isOpen', value: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isLoaded = ref(false);
const modalContent = ref<HTMLElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

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

function trapFocus(event: KeyboardEvent) {
  const focusableElements =
    modalContent.value?.querySelectorAll<HTMLElement>(focusableSelector);

  if (!focusableElements?.length) {
    event.preventDefault();
    modalContent.value?.focus();
    return;
  }

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

watch(
  () => props.isOpen,
  async newValue => {
    if (newValue) {
      isLoaded.value = false;
      document.addEventListener('keydown', onKeydown);
      document.body.style.overflow = 'hidden';
      await nextTick();
      closeButton.value?.focus();
    } else {
      document.removeEventListener('keydown', onKeydown);
      document.body.style.overflow = '';
      props.returnFocusTo?.focus();
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
  padding: 12px;
}

.modal-content {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 80px var(--shadow-color);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 76px;
  padding: 12px 16px 12px 24px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-medium);
}

.modal-heading {
  min-width: 0;
}

.modal-kicker {
  display: block;
  margin-bottom: 2px;
  color: var(--accent-bright);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.modal-title {
  margin: 0;
  overflow: hidden;
  color: var(--text-link-hover);
  font-size: 1.1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.modal-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.modal-open-link {
  padding: 8px 12px;
  border: 1px solid var(--border-dark);
  border-radius: 6px;
  color: var(--text-modal-title);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    border-color 0.2s,
    color 0.2s;
}

.modal-open-link:hover {
  border-color: var(--accent);
  color: var(--white);
}

.modal-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-dark);
  border-radius: 8px;
  color: var(--text-modal-close);
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.modal-close:hover {
  background: var(--bg-card-hover);
  border-color: var(--accent);
  color: var(--text-link-hover);
}

.modal-body {
  flex: 1;
  min-height: 0;
  background: var(--white);
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 640px) {
  .modal-overlay {
    padding: 0;
  }

  .modal-content {
    border: 0;
    border-radius: 0;
  }

  .modal-header {
    min-height: 64px;
    padding: 10px 12px 10px 16px;
  }

  .modal-kicker,
  .modal-open-link {
    display: none;
  }
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
