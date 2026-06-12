<template>
  <svg
    :class="['svg-icon', `svg-icon--${props.icon}`]"
    :width="size"
    :height="size"
    :viewBox="props.icon === 'telegram' ? '0 0 27 27' : '0 0 24 24'"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <template v-if="props.icon === 'email'">
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <polyline
        points="22,6 12,13 2,6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="props.icon === 'telegram'">
      <path
        d="M21.198 2.433a2.242 2.242 0 0 0-1.067.15l-16.5 7.5a4.5 4.5 0 0 0 .662 8.39l3.494 1.3 1.2 3.81a1.5 1.5 0 0 0 2.46.45l2.374-2.262 4.63 3.434a2.25 2.25 0 0 0 3.456-.893l2.918-13.046 1.28-6.783a2.25 2.25 0 0 0-1.857-2.556z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="m9.27 10.213 11.343-4.487-8.952 8.716-.758 3.845 3.876-7.46"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="props.icon === 'github'">
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="props.icon === 'phone'">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="props.icon === 'location'">
      <path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5" />
    </template>

    <template v-else-if="props.icon === 'menu'">
      <line
        x1="4"
        y1="6"
        x2="20"
        y2="6"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="4"
        y1="18"
        x2="20"
        y2="18"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="props.icon === 'close'">
      <line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <line
        x1="18"
        y1="6"
        x2="6"
        y2="18"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </template>

    <slot />
  </svg>
</template>

<script setup lang="ts">
import type { IconType } from '@/types.ts';

const props = defineProps<{
  icon: IconType;
  size?: number;
}>();
</script>

<style scoped lang="postcss">
.svg-icon {
  flex-shrink: 0;
}
</style>
