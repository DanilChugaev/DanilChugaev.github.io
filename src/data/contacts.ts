import type { Contact } from '@/types.ts';

export const contacts: Contact[] = [
  {
    label: 'Email',
    href: 'mailto:danilchugaev@mail.ru',
    value: 'danilchugaev@mail.ru',
    icon: 'email',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/danilchugaev',
    value: '@danilchugaev',
    icon: 'telegram',
    target: '_blank',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/DanilChugaev',
    value: 'DanilChugaev',
    icon: 'github',
    target: '_blank',
  },
  {
    label: 'Телефон',
    href: 'tel:+79504784471',
    value: '+7 (950) 478-44-71',
    icon: 'phone',
  },
];

export const location = {
  text: 'Новосибирск, Россия',
  icon: 'location',
};
