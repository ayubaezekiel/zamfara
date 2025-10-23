import { storage, databases } from '@/lib/appwrite'
import {
  BLOG_POSTS_COLLECTION_ID,
  BUCKET_ID,
  DATABASE_ID,
  SCHEDULES_COLLECTION_ID,
} from '@/lib/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ID } from 'appwrite'

interface BlogPostFormData {
  title: string
  author: string
  publishDate: string
  summary?: string | null
  contentPath?: string
  isPublished?: boolean
  tags?: string | null
  file: File
}

interface SchedulesFormData {
  eventName: string
  startDate: string
  endDate: string
  location?: string
  createdBy: string
  notice: string
  status?: string
}

/* ---------- UPDATE MUTATION ---------- */
interface UpdateBlogPostPayload
  extends Partial<Omit<BlogPostFormData, 'file'>> {
  /** Existing document ID – **required** for update */
  documentId: string
  /** New file (optional) */
  file?: File
}
/* ---------- UPDATE MUTATION ---------- */
interface UpdateSchedulePayload extends Partial<SchedulesFormData> {
  documentId: string
}

/* ---------- CREATE MUTATION ---------- */
export const useCreateScheduleMutation = () => {
  return useMutation({
    mutationFn: async (data: SchedulesFormData) => {
      try {
        const doc = await databases.createDocument(
          DATABASE_ID,
          SCHEDULES_COLLECTION_ID,
          ID.unique(),
          {
            eventName: data.eventName,
            startDate: data.startDate,
            endDate: data.endDate,
            location: data.location,
            createdBy: data.createdBy,
            notice: data.notice,
          },
        )

        return { doc }
      } catch (err: any) {
        throw new Error(err?.message ?? 'Failed to create notice schedule')
      }
    },
  })
}

export const useUpdateScheduleMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: UpdateSchedulePayload) => {
      const { documentId, ...fields } = payload
      try {
        const doc = await databases.updateDocument(
          DATABASE_ID,
          SCHEDULES_COLLECTION_ID,
          documentId,
          {
            ...fields,
          },
        )

        return { doc }
      } catch (err: any) {
        throw new Error(err?.message ?? 'Failed to update notice schedule')
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
    },
  })
}

export const useDeleteScheduleMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (documentId: string) => {
      await databases.deleteDocument(
        DATABASE_ID,
        SCHEDULES_COLLECTION_ID,
        documentId,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
    },
  })
}

/* ---------- Helper ---------- */
const uploadFileAndGetUrl = async (file: File) => {
  const fileId = ID.unique()
  const fileRes = await storage.createFile(BUCKET_ID, fileId, file)

  // Official way – returns a signed URL (works in admin mode)
  const url = storage.getFileView(BUCKET_ID, fileRes.$id)
  return { fileRes, url }
}

/* ---------- CREATE MUTATION ---------- */
export const useCreateBlogPostMutation = () => {
  return useMutation({
    mutationFn: async (data: BlogPostFormData) => {
      try {
        const { url } = await uploadFileAndGetUrl(data.file)

        const doc = await databases.createDocument(
          DATABASE_ID,
          BLOG_POSTS_COLLECTION_ID,
          ID.unique(),
          {
            title: data.title,
            author: data.author,
            publishDate: data.publishDate,
            summary: data.summary ?? null,
            contentPath: url,
            tags: data.tags ?? null,
            isPublished: data.isPublished ?? false,
          },
        )

        return { doc, fileUrl: url }
      } catch (err: any) {
        throw new Error(err?.message ?? 'Failed to create blog post')
      }
    },
  })
}

export const useUpdateBlogPostMutation = () => {
  return useMutation({
    mutationFn: async (payload: UpdateBlogPostPayload) => {
      const { documentId, file, ...fields } = payload

      let contentPath: string | undefined

      if (file) {
        const { url } = await uploadFileAndGetUrl(file)
        contentPath = url
      }

      try {
        const doc = await databases.updateDocument(
          DATABASE_ID,
          BLOG_POSTS_COLLECTION_ID,
          documentId,
          {
            ...fields,
            ...(contentPath && { contentPath }),
          },
        )

        return { doc, fileUrl: contentPath }
      } catch (err: any) {
        throw new Error(err?.message ?? 'Failed to update blog post')
      }
    },
  })
}

export const useDeleteBlogPostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (documentId: string) => {
      await databases.deleteDocument(
        DATABASE_ID,
        BLOG_POSTS_COLLECTION_ID,
        documentId,
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
    },
  })
}
