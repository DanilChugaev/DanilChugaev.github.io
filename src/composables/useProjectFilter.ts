import { ref, computed } from 'vue';
import { projects } from '@/data/projects';
import type { Project, ProjectType } from '@/types';

export function useProjectFilter() {
  const selectedYear = ref<'all' | number>('all');
  const selectedType = ref<'all' | ProjectType>('all');

  const uniqueYears = computed(() => {
    const years = projects.map((p: Project) => p.year);
    return [...new Set(years)].sort((a: number, b: number) => b - a);
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
      .sort((a: Project, b: Project) => b.year - a.year);
  });

  return {
    selectedYear,
    selectedType,
    uniqueYears,
    filteredProjects,
  };
}
