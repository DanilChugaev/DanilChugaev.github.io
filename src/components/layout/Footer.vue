<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <p>© 2026 Данил Чугаев. Все права защищены.</p>

        <div class="social-links">
          <a
            v-for="contact in footerContacts"
            :key="contact.label"
            :href="contact.href"
            v-bind="contact.target ? { target: contact.target } : {}"
          >
            {{ contact.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Contact } from '@/types.ts';
import { contacts } from '@/data/contacts.ts';

const footerContacts = computed(() =>
  contacts.filter((c: Contact) => c.label !== 'Телефон'),
);
</script>

<style scoped lang="postcss">
.footer {
  background: #0a0a0a;
  padding: 50px 0 30px;
  margin-top: 80px;
  border-top: 1px solid #222;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  color: #888;
  font-size: 0.95rem;
}

.social-links a {
  color: #888;
  text-decoration: none;
  margin-left: 24px;
  transition: color 0.3s;
}

.social-links a:hover {
  color: #0066ff;
}

@media (max-width: 768px) {
  .footer-content {
    justify-content: center;
    text-align: center;
  }

  .social-links {
    margin-top: 10px;
  }

  .social-links a {
    margin-left: 16px;
  }
}
</style>
