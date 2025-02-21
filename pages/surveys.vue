<template>
  <div class="container mx-auto py-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-1">
        <h1 class="text-3xl font-bold tracking-tight">Your Surveys</h1>
        <Button @click="router.push('/create')">
          <PlusIcon class="mr-2 h-4 w-4" />
          Create Survey
        </Button>
      </div>
      <p class="text-muted-foreground">Manage and view your created surveys</p>
    </div>

    <!-- Surveys List -->
    <div class="grid gap-4">
      <Card v-for="survey in surveys" :key="survey.id">
        <CardHeader>
          <CardTitle>{{ survey.name }}</CardTitle>
          <CardDescription>
            {{ survey.questions.length }} questions
            <span class="text-muted-foreground">·</span>
            Created {{ formatDate(survey.createdAt) }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-2">
            <Button variant="outline" @click="router.push(`/survey/${survey.id}`)">
              <EyeIcon class="mr-2 h-4 w-4" />
              View
            </Button>
            <Button variant="outline" @click="router.push(`/create?id=${survey.id}`)">
              <PencilIcon class="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="destructive" @click="handleDelete(survey.id)">
              <TrashIcon class="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      <!-- Empty State -->
      <div v-if="!surveys.length" class="text-center py-12">
        <div class="mb-4 text-muted-foreground">
          <ClipboardIcon class="mx-auto h-12 w-12" />
        </div>
        <h3 class="text-lg font-medium mb-2">No surveys yet</h3>
        <p class="text-muted-foreground mb-4">Create your first survey to get started</p>
        <Button @click="router.push('/create')">
          <PlusIcon class="mr-2 h-4 w-4" />
          Create Survey
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Plus as PlusIcon,
  Eye as EyeIcon,
  Pencil as PencilIcon,
  Trash as TrashIcon,
  Clipboard as ClipboardIcon
} from 'lucide-vue-next'
import { useSurvey } from '~/composables/useSurvey'
import Button from '~/components/ui/button/Button.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

const router = useRouter()
const { listSurveys, deleteSurvey } = useSurvey()
const surveys = ref(listSurveys())

// Format date helper
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Delete survey
const handleDelete = async (id: string) => {
  try {
    await deleteSurvey(id)
    // Refresh the list
    surveys.value = listSurveys()
  } catch (error) {
    console.error('Error deleting survey:', error)
  }
}

// Load surveys on mount
onMounted(() => {
  surveys.value = listSurveys()
})
</script>
