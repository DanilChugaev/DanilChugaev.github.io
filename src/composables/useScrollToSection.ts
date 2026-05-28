import type { SectionIdType } from '@/types.ts';

const HEADER_OFFSET = 80;

export function useScrollToSection() {
  function scrollToSection(sectionId: SectionIdType) {
    const element = document.getElementById(sectionId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }

  return { scrollToSection };
}
