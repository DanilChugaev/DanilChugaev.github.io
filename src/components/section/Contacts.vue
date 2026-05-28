<template>
  <Section id="contact" title="Контакты" class="contact-section">
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
            <span class="icon">{{ contact.icon }}</span>
            <div>
              <strong>{{ contact.label }}</strong
              ><br />
              {{ contact.value }}
            </div>
          </a>
        </div>
      </div>

      <div class="contact-note">
        <p class="location">{{ location }}</p>
      </div>
    </div>
  </Section>
</template>

<script setup lang="ts">
import Section from '@/components/layout/Section.vue';
import { contacts, location } from '@/data/contacts.ts';
</script>

<style scoped lang="postcss">
.contact-section {
  background: #0a0a0a;
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
  color: #ccc;
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
  gap: 16px;
  padding: 20px;
  background: #1e1e1e;
  border-radius: 12px;
  text-decoration: none;
  color: #ddd;
  transition: all 0.3s;
}

.contact-item:hover {
  background: #252525;
  transform: translateY(-4px);
  color: #fff;
}

.contact-item .icon {
  font-size: 1.8rem;
  width: 40px;
}

.contact-item strong {
  display: block;
  font-size: 1.05rem;
  margin-bottom: 4px;
}

.contact-note {
  background: #1a1a1a;
  padding: 32px;
  border-radius: 16px;
  border-left: 5px solid #0066ff;
}

.contact-note p {
  margin-bottom: 12px;
  color: #bbb;
}

.location {
  font-size: 1.1rem;
  color: #888;
}

/* Мобильная адаптация */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .contact-links {
    grid-template-columns: 1fr;
  }
}
</style>
