<!-- Survey List Page -->
<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-semibold text-gray-900">Surveys</h1>
      <BaseButton
        variant="primary"
        @click="router.push('/create')"
      >
        <template #icon-left>
          <PlusIcon class="h-4 w-4 mr-1.5" />
        </template>
        Create Survey
      </BaseButton>
    </div>

    <!-- Table -->
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Questions</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Updated</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="survey in surveys" :key="survey.id" class="hover:bg-gray-50">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ survey.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ survey.questions.length }} question{{ survey.questions.length === 1 ? '' : 's' }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ formatDate(survey.createdAt) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ survey.updatedAt ? formatDate(survey.updatedAt) : '-' }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div class="flex items-center gap-2">
                      <BaseButton
                        variant="secondary"
                        @click="router.push(`/chat/${survey.id}`)"
                      >
                        <template #icon-left>
                          <PlayIcon class="h-4 w-4 mr-1.5" />
                        </template>
                        Test
                      </BaseButton>
                      <BaseButton
                        variant="secondary"
                        @click="router.push(`/create?id=${survey.id}`)"
                      >
                        <template #icon-left>
                          <PencilIcon class="h-4 w-4 mr-1.5" />
                        </template>
                        Edit
                      </BaseButton>
                    </div>
                  </td>
                </tr>

                <!-- Empty state -->
                <tr v-if="surveys.length === 0">
                  <td colspan="5" class="py-8 text-center">
                    <p class="text-sm text-gray-500 mb-4">No surveys created yet</p>
                    <NuxtLink 
                      to="/create" 
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      Create your first survey
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSurvey } from '~/composables/useSurvey'
import BaseButton from '~/components/BaseButton.vue'
import { PlusIcon, PencilIcon, PlayIcon } from '@heroicons/vue/24/outline'

const router = useRouter()
const { listSurveys } = useSurvey()
const surveys = ref([])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(() => {
  surveys.value = listSurveys()
})
</script>
