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

  describe('filteredProjects', () => {
    it('должен возвращать все проекты когда фильтры равны "all"', async () => {
      const { filteredProjects } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      expect(filteredProjects.value.length).toBe(projects.length);
    });

    it('должен фильтровать проекты по году', async () => {
      const { filteredProjects, selectedYear } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      const year = projects[0].year;
      selectedYear.value = year;

      expect(filteredProjects.value.every(p => p.year === year)).toBe(true);
    });

    it('должен фильтровать проекты по типу', async () => {
      const { filteredProjects, selectedType } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      const type = projects[0].type;
      selectedType.value = type;

      expect(filteredProjects.value.every(p => p.type === type)).toBe(true);
    });

    it('должен фильтровать проекты по технологии', async () => {
      const { filteredProjects, selectedTechnology } = useProjectFilter();
      const { projects } = await import('@/data/projects');

      const tech = projects[0].technologies[0];
      selectedTechnology.value = tech;

      expect(
        filteredProjects.value.every(p => p.technologies.includes(tech)),
      ).toBe(true);
    });

    it('должен применять несколько фильтров одновременно', async () => {
      const { filteredProjects, selectedYear, selectedType } =
        useProjectFilter();
      const { projects } = await import('@/data/projects');

      const year = projects[0].year;
      const type = projects[0].type;

      selectedYear.value = year;
      selectedType.value = type;

      expect(
        filteredProjects.value.every(p => p.year === year && p.type === type),
      ).toBe(true);
    });

    it('должен возвращать пустой массив при отсутствии совпадений', () => {
      const { filteredProjects, selectedYear } = useProjectFilter();

      selectedYear.value = 1900;

      expect(filteredProjects.value.length).toBe(0);
    });

    it('должен сортировать проекты по году по убыванию', () => {
      const { filteredProjects } = useProjectFilter();

      for (let i = 0; i < filteredProjects.value.length - 1; i++) {
        expect(filteredProjects.value[i].year).toBeGreaterThanOrEqual(
          filteredProjects.value[i + 1].year,
        );
      }
    });
  });
});
