import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidV4 } from 'uuid';

const initialLoad = (): Project[] => {
  return [
    {
      id: uuidV4(),
      name: 'Project 1',
      tasks: [],
    },
    {
      id: uuidV4(),
      name: 'Project 2',
      tasks: [],
    },
  ];
};

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>(initialLoad());

  const addProject = (name: string) => {
    if (name.length === 0) return;

    projects.value.push({
      id: uuidV4(),
      name: name,
      tasks: [],
    });
  };

  return {
    projectList: computed(() => [...projects.value]),
    addProject,
  };
});
