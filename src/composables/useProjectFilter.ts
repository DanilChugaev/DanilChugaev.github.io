import { ref, computed } from 'vue';
import { projects } from '@/data/projects';
import type { Project, ProjectType } from '@/types';

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

  const filteredProjects = computed(() => {
    return projects
      .filter(
        (p: Project) =>
          selectedYear.value === 'all' || p.year === selectedYear.value,
      )
      .filter(
        (p: Project) =>
          selectedType.value === 'all' || p.type === selectedType.value,
      )
      .filter(
        (p: Project) =>
          selectedTechnology.value === 'all' ||
          p.technologies.includes(selectedTechnology.value),
      )
      .sort((a: Project, b: Project) => b.year - a.year);
  });

  return {
    selectedYear,
    selectedType,
    selectedTechnology,
    uniqueYears,
    uniqueTechnologies,
    filteredProjects,
  };
}
