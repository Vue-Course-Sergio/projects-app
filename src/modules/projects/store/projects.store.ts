import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '@vueuse/core';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []));

  const addProject = (name: string) => {
    if (name.length === 0) return;

    projects.value.push({
      id: uuidV4(),
      name: name,
      tasks: [],
    });
  };

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return;

    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return;

    project.tasks.push({
      id: uuidV4(),
      name: taskName,
    });
  };

  return {
    // Properties
    projects,
    // Getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    // Actions
    addProject,
    addTaskToProject,
  };
});
