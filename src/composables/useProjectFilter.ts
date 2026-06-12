import { ref, computed } from 'vue';
import { projects } from '@/data/projects';
import type { Project, ProjectType } from '@/types';

/**
 * Композабл для фильтрации проектов.
 *
 * Ключевое изменение: вместо уничтожения DOM-элементов через v-if/v-for с filteredProjects,
 * теперь все карточки всегда находятся в DOM (используется v-show), а фильтры только
 * управляют видимостью через CSS display property. Это предотвращает повторную загрузку
 * изображений при переключении фильтров.
 */
export function useProjectFilter() {
  const selectedYear = ref<'all' | number>('all');
  const selectedType = ref<'all' | ProjectType>('all');
  const selectedTechnology = ref<'all' | string>('all');

  const uniqueYears = computed(() => {
    const years = projects.map((p: Project) => p.year);
    return [...new Set(years)].sort((a: number, b: number) => b - a);
  });

  const uniqueTechnologies = computed(() => {
    const techCount = new Map<string, number>();
    projects.forEach((p: Project) => {
      p.technologies.forEach((t: string) => {
        techCount.set(t, (techCount.get(t) ?? 0) + 1);
      });
    });
    return [...techCount.entries()]
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .map(([tech]) => tech);
  });

  /**
   * Проверяет, соответствует ли проект текущим фильтрам.
   * Используется для определения видимости карточки через v-show.
   */
  function matchesFilters(project: Project): boolean {
    const yearMatch =
      selectedYear.value === 'all' || project.year === selectedYear.value;
    const typeMatch =
      selectedType.value === 'all' || project.type === selectedType.value;
    const techMatch =
      selectedTechnology.value === 'all' ||
      project.technologies.includes(selectedTechnology.value);
    return yearMatch && typeMatch && techMatch;
  }

  /**
   * Сортировка по году (новые первыми).
   * Список ВСЕГДА содержит все проекты — фильтры не удаляют элементы из массива.
   */
  function sortByYear(a: Project, b: Project): number {
    return b.year - a.year;
  }

  /**
   * Отсортированный список ВСЕХ проектов.
   * Используется в v-for — все карточки всегда в DOM.
   */
  const sortedProjects = computed(() => [...projects].sort(sortByYear));

  /**
   * Карта видимости каждого проекта по id.
   * Ключевая часть решения: вместо фильтрации массива проектов,
   * мы храним boolean-карту и используем v-show="isVisible[project.id]" в шаблоне.
   */
  const isVisible = computed(() => {
    const map: Record<number, boolean> = {};
    projects.forEach((p: Project) => {
      map[p.id] = matchesFilters(p);
    });
    return map;
  });

  /**
   * Есть ли хотя бы один видимый проект.
   * Используется для показа сообщения "Нет таких".
   */
  const hasVisibleProjects = computed(() =>
    sortedProjects.value.some(p => isVisible.value[p.id]),
  );

  return {
    selectedYear,
    selectedType,
    selectedTechnology,
    uniqueYears,
    uniqueTechnologies,
    sortedProjects,
    isVisible,
    hasVisibleProjects,
  };
}
