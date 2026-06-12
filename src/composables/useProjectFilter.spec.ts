import { describe, it, expect } from 'vitest';
import { useProjectFilter } from './useProjectFilter';

describe('useProjectFilter', () => {
  describe('инициализация', () => {
    it('должен инициализировать фильтры со значением "all"', () => {
      const { selectedYear, selectedType, selectedTechnology } =
        useProjectFilter();

      expect(selectedYear.value).toBe('all');
      expect(selectedType.value).toBe('all');
      expect(selectedTechnology.value).toBe('all');
    });
  });

  describe('uniqueYears', () => {
    it('должен возвращать уникальный список годов, отсортированный по убыванию', () => {
      const { uniqueYears } = useProjectFilter();

      expect(uniqueYears.value.length).toBeGreaterThan(0);
      expect(uniqueYears.value[0]).toBeGreaterThanOrEqual(
        uniqueYears.value[uniqueYears.value.length - 1],
      );
    });

    it('не должен содержать дубликатов', () => {
      const { uniqueYears } = useProjectFilter();

      const yearsSet = new Set(uniqueYears.value);
      expect(yearsSet.size).toBe(uniqueYears.value.length);
    });
  });

  describe('uniqueTechnologies', () => {
    it('должен возвращать технологии, использованные 2+ раза', () => {
      const { uniqueTechnologies } = useProjectFilter();

      expect(uniqueTechnologies.value.length).toBeGreaterThan(0);
    });

    it('должен быть отсортирован по количеству использований по убыванию', async () => {
      const { uniqueTechnologies } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      if (uniqueTechnologies.value.length < 2) return;

      const allTech = new Map<string, number>();
      projects.forEach(p => {
        p.technologies.forEach(t => {
          allTech.set(t, (allTech.get(t) ?? 0) + 1);
        });
      });

      const firstCount = allTech.get(uniqueTechnologies.value[0]) ?? 0;
      const secondCount = allTech.get(uniqueTechnologies.value[1]) ?? 0;
      expect(firstCount).toBeGreaterThanOrEqual(secondCount);
    });
  });

  describe('sortedProjects', () => {
    it('должен возвращать ВСЕ проекты (фильтрация через v-show, не через filter)', async () => {
      const { sortedProjects } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      expect(sortedProjects.value.length).toBe(projects.length);
    });

    it('должен сортировать проекты по году по убыванию', () => {
      const { sortedProjects } = useProjectFilter();

      for (let i = 0; i < sortedProjects.value.length - 1; i++) {
        expect(sortedProjects.value[i].year).toBeGreaterThanOrEqual(
          sortedProjects.value[i + 1].year,
        );
      }
    });
  });

  describe('isVisible', () => {
    it('должен содержать карту видимости для каждого проекта', async () => {
      const { isVisible } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      // Карта должна иметь запись для каждого проекта
      for (const project of projects) {
        expect(isVisible.value).toHaveProperty(String(project.id));
      }
    });

    it('при инициализации все проекты должны быть видимы (фильтры = "all")', () => {
      const { isVisible } = useProjectFilter();

      for (const id in isVisible.value) {
        expect(isVisible.value[Number(id)]).toBe(true);
      }
    });

    it('должен скрывать проекты при выборе конкретного года', async () => {
      const { isVisible, selectedYear, sortedProjects } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      const year = projects[0].year;
      selectedYear.value = year;

      // Все отфильтрованные проекты должны быть скрыты
      const hiddenCount = sortedProjects.value.filter(
        p => !isVisible.value[p.id],
      ).length;
      const yearProjects = projects.filter(p => p.year !== year).length;
      expect(hiddenCount).toBe(yearProjects);
    });

    it('должен скрывать проекты при выборе конкретного типа', async () => {
      const { isVisible, selectedType, sortedProjects } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      const type = projects[0].type;
      selectedType.value = type;

      // Все отфильтрованные проекты должны быть скрыты
      const hiddenCount = sortedProjects.value.filter(
        p => !isVisible.value[p.id],
      ).length;
      const typeProjects = projects.filter(p => p.type !== type).length;
      expect(hiddenCount).toBe(typeProjects);
    });

    it('должен скрывать проекты при выборе конкретной технологии', async () => {
      const { isVisible, selectedTechnology, sortedProjects } =
        useProjectFilter();
      const { projects } = await import('@/data/projects');

      const tech = projects[0].technologies[0];
      selectedTechnology.value = tech;

      // Все отфильтрованные проекты должны быть скрыты
      const hiddenCount = sortedProjects.value.filter(
        p => !isVisible.value[p.id],
      ).length;
      const techProjects = projects.filter(
        p => !p.technologies.includes(tech),
      ).length;
      expect(hiddenCount).toBe(techProjects);
    });

    it('должен скрывать проекты при нескольких одновременных фильтрах', async () => {
      const { isVisible, selectedYear, selectedType, sortedProjects } =
        useProjectFilter();

      selectedYear.value = 2024;
      selectedType.value = 'test';

      const visibleCount = sortedProjects.value.filter(
        p => isVisible.value[p.id],
      ).length;
      expect(visibleCount).toBeGreaterThan(0);

      // Все видимые проекты должны соответствовать обоим фильтрам
      for (const project of sortedProjects.value) {
        if (isVisible.value[project.id]) {
          expect(project.year).toBe(2024);
          expect(project.type).toBe('test');
        }
      }
    });

    it('должен вернуть все проекты видимыми при сбросе фильтров', () => {
      const { isVisible, selectedYear, selectedType, selectedTechnology } =
        useProjectFilter();

      selectedYear.value = 1900;
      selectedType.value = 'game';
      selectedTechnology.value = 'NonExistentTech';

      // Сбрасываем все фильтры
      selectedYear.value = 'all';
      selectedType.value = 'all';
      selectedTechnology.value = 'all';

      for (const id in isVisible.value) {
        expect(isVisible.value[Number(id)]).toBe(true);
      }
    });
  });

  describe('hasVisibleProjects', () => {
    it('должен быть true при инициализации', () => {
      const { hasVisibleProjects } = useProjectFilter();
      expect(hasVisibleProjects.value).toBe(true);
    });

    it('должен стать false когда все проекты отфильтрованы', async () => {
      const { hasVisibleProjects, selectedYear } = useProjectFilter();

      selectedYear.value = 1900;
      expect(hasVisibleProjects.value).toBe(false);
    });

    it('должен стать true снова после сброса фильтров', async () => {
      const { hasVisibleProjects, selectedYear } = useProjectFilter();

      selectedYear.value = 1900;
      selectedYear.value = 'all';
      expect(hasVisibleProjects.value).toBe(true);
    });
  });
});
