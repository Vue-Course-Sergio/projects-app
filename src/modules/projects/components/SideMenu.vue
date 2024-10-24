<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p v-if="projectStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- Menu -->
    <ul v-else class="menu">
      <li v-for="project in projectStore.projectList" :key="project.id">
        <template v-if="project.tasks.length > 0">
          <details>
            <summary>
              <RouterLink :to="`/projects/${project.id}`">
                {{ project.name }}
              </RouterLink>
            </summary>
            <ul>
              <li v-for="taks in project.tasks" :key="taks.id">
                <RouterLink :to="`/projects/${project.id}`">{{ taks.name }}</RouterLink>
              </li>
            </ul>
          </details>
        </template>

        <template v-else>
          <RouterLink :to="`/projects/${project.id}`">
            {{ project.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { useProjectsStore } from '../store/projects.store';

const projectStore = useProjectsStore();
</script>
