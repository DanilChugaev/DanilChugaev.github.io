<template>
  <Section id="contacts" title="Контакты" class="contact-section">
    <div class="contact-content">
      <div class="contact-info">
        <div class="contact-links">
          <a
            v-for="contact in contacts"
            :key="contact.label"
            :href="contact.href"
            v-bind="contact.target ? { target: contact.target } : {}"
            class="contact-item"
          >
            <SvgIcon class="icon" :icon="contact.icon as IconType" :size="24" />
            <div>
              <strong>{{ contact.label }}</strong>
              {{ contact.value }}
            </div>
          </a>
        </div>
      </div>

      <div class="contact-note contact-item">
        <SvgIcon :icon="location.icon as IconType" :size="20" />
        {{ location.text }}
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/components/layout/Section.vue';
import { contacts, location } from '@/data/contacts.ts';
import SvgIcon from '@/icons/SvgIcon.vue';
import type { IconType } from '@/types.ts';
</script>

<style scoped lang="postcss">
.contact-section {
  background: var(--bg-about-card);
}

.contact-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 80px;
  align-items: center;
  max-width: 910px;
  margin: 0 auto;
}

.contact-text {
  font-size: 1.25rem;
  color: var(--text-about-heading);
  margin-bottom: 40px;
  line-height: 1.5;
}

.contact-links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: var(--bg-card);
  border-radius: 12px;
  text-decoration: none;
  color: var(--text-link);
  transition: all 0.3s;
}

.contact-item:hover {
  background: var(--bg-card-hover);
  transform: translateY(-4px);
  color: var(--text-link-hover);
}

.contact-item .icon {
  --icon-size: 24px;
}

.contact-item strong {
  display: block;
  font-size: 1.05rem;
  margin-bottom: 4px;
}

.contact-note {
  background: var(--bg-contact-note);
  padding: 32px;
  border-radius: 16px;
  border-left: 5px solid var(--border-accent);
}

.contact-note p {
  color: var(--text-contact-note);
}

.location {
  font-size: 1.1rem;
  color: var(--text-muted);
}

/* Мобильная адаптация */
@media (max-width: 999px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .contact-links {
    grid-template-columns: 1fr;
  }
}
</style>
