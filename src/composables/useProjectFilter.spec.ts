import { describe, expect, it } from 'vitest';
import { projects } from '@/data/projects';
import { useProjectFilter } from './useProjectFilter';

describe('useProjectFilter', () => {
  it('инициализирует фильтры пустыми массивами и показывает все проекты', () => {
    const { isVisible, selectedTechnologies, selectedTypes, selectedYears } =
      useProjectFilter();

    expect(selectedYears.value).toEqual([]);
    expect(selectedTypes.value).toEqual([]);
    expect(selectedTechnologies.value).toEqual([]);
    expect(Object.values(isVisible.value)).toEqual(
      Array(projects.length).fill(true),
    );
  });

  it('возвращает уникальные годы и технологии для фильтров', () => {
    const { uniqueTechnologies, uniqueYears } = useProjectFilter();

    expect(uniqueYears.value).toEqual(
      [...uniqueYears.value].sort((a, b) => b - a),
    );
    expect(new Set(uniqueYears.value).size).toBe(uniqueYears.value.length);
    expect(uniqueTechnologies.value.length).toBeGreaterThan(0);
  });

  it('отбирает проекты по нескольким годам с логикой «или»', () => {
    const { isVisible, selectedYears, sortedProjects } = useProjectFilter();
    selectedYears.value = [2024, 2026];

    for (const project of sortedProjects.value) {
      expect(isVisible.value[project.id]).toBe(
        project.year === 2024 || project.year === 2026,
      );
    }
  });

  it('отбирает проекты по нескольким типам с логикой «или»', () => {
    const { isVisible, selectedTypes, sortedProjects } = useProjectFilter();
    selectedTypes.value = ['service', 'game'];

    for (const project of sortedProjects.value) {
      expect(isVisible.value[project.id]).toBe(
        project.type === 'service' || project.type === 'game',
      );
    }
  });

  it('отбирает проекты по нескольким технологиям с логикой «или»', () => {
    const { isVisible, selectedTechnologies, sortedProjects } =
      useProjectFilter();
    selectedTechnologies.value = ['React 19', 'Canvas'];

    for (const project of sortedProjects.value) {
      expect(isVisible.value[project.id]).toBe(
        project.technologies.includes('React 19') ||
          project.technologies.includes('Canvas'),
      );
    }
  });

  it('применяет разные группы фильтров с логикой «и»', () => {
    const { isVisible, selectedTypes, selectedYears, sortedProjects } =
      useProjectFilter();
    selectedYears.value = [2024];
    selectedTypes.value = ['test'];

    for (const project of sortedProjects.value) {
      expect(isVisible.value[project.id]).toBe(
        project.year === 2024 && project.type === 'test',
      );
    }
  });

  it('оставляет в других фильтрах только совместимые значения', () => {
    const { availableTypes, selectedYears } = useProjectFilter();
    selectedYears.value = [2026];

    expect(availableTypes.value).not.toContain('test');
    expect(availableTypes.value).toContain('service');
    expect(availableTypes.value).toContain('game');
  });

  it('скрывает все проекты при отсутствии совпадений', () => {
    const { hasVisibleProjects, selectedYears } = useProjectFilter();
    selectedYears.value = [1900];

    expect(hasVisibleProjects.value).toBe(false);
  });
});
