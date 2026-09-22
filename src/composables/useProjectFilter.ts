import { computed, ref } from 'vue';
import { projects } from '@/data/projects';
import type { Project, ProjectType } from '@/types';

export function useProjectFilter() {
  const selectedYears = ref<number[]>([]);
  const selectedTypes = ref<ProjectType[]>([]);
  const selectedTechnologies = ref<string[]>([]);

  const uniqueYears = computed(() =>
    [...new Set(projects.map(project => project.year))].sort((a, b) => b - a),
  );

  const uniqueTechnologies = computed(() => {
    const techCount = new Map<string, number>();
    projects.forEach(project => {
      project.technologies.forEach(technology => {
        techCount.set(technology, (techCount.get(technology) ?? 0) + 1);
      });
    });

    return [...techCount.entries()]
      .filter(([, count]) => count >= 2)
      .sort((first, second) => second[1] - first[1])
      .map(([technology]) => technology);
  });

  function matchesSelectedYears(project: Project): boolean {
    return (
      selectedYears.value.length === 0 ||
      selectedYears.value.includes(project.year)
    );
  }

  function matchesSelectedTypes(project: Project): boolean {
    return (
      selectedTypes.value.length === 0 ||
      selectedTypes.value.includes(project.type)
    );
  }

  function matchesSelectedTechnologies(project: Project): boolean {
    return (
      selectedTechnologies.value.length === 0 ||
      selectedTechnologies.value.some(technology =>
        project.technologies.includes(technology),
      )
    );
  }

  function matchesFilters(project: Project): boolean {
    return (
      matchesSelectedYears(project) &&
      matchesSelectedTypes(project) &&
      matchesSelectedTechnologies(project)
    );
  }

  const sortedProjects = computed(() =>
    [...projects].sort((a, b) => b.year - a.year),
  );

  const isVisible = computed(() => {
    const map: Record<number, boolean> = {};
    projects.forEach(project => {
      map[project.id] = matchesFilters(project);
    });
    return map;
  });

  const hasVisibleProjects = computed(() =>
    sortedProjects.value.some(project => isVisible.value[project.id]),
  );

  const availableYears = computed(
    () =>
      new Set(
        projects
          .filter(
            project =>
              matchesSelectedTypes(project) &&
              matchesSelectedTechnologies(project),
          )
          .map(project => project.year),
      ),
  );

  const availableTypes = computed(
    () =>
      new Set(
        projects
          .filter(
            project =>
              matchesSelectedYears(project) &&
              matchesSelectedTechnologies(project),
          )
          .map(project => project.type),
      ),
  );

  const availableTechnologies = computed(
    () =>
      new Set(
        projects
          .filter(
            project =>
              matchesSelectedYears(project) && matchesSelectedTypes(project),
          )
          .flatMap(project => project.technologies),
      ),
  );

  return {
    selectedYears,
    selectedTypes,
    selectedTechnologies,
    uniqueYears,
    uniqueTechnologies,
    availableYears,
    availableTypes,
    availableTechnologies,
    sortedProjects,
    isVisible,
    hasVisibleProjects,
  };
}
