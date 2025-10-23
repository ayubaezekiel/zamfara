import { account, tablesDB } from '@/lib/appwrite'
import {
  BLOG_POSTS_COLLECTION_ID,
  DATABASE_ID,
  SCHEDULES_COLLECTION_ID,
} from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'

export const useSchedulesQuery = () => {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const response = await tablesDB.listRows<SchedulesType>({
        databaseId: DATABASE_ID,
        tableId: SCHEDULES_COLLECTION_ID,
      })
      return response.rows
    },
  })
}

export const useBlogQuery = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const response = await tablesDB.listRows<BlogPostType>({
        databaseId: DATABASE_ID,
        tableId: BLOG_POSTS_COLLECTION_ID,
      })
      return response.rows
    },
  })
}

export const useBlogQueryById = (id: string) => {
  return useQuery({
    queryKey: ['blog-posts', id],
    queryFn: async () => {
      const response = await tablesDB.getRow<BlogPostType>({
        databaseId: DATABASE_ID,
        tableId: BLOG_POSTS_COLLECTION_ID,
        rowId: id,
      })
      return response
    },
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const user = await account.get()
      return user
    },
  })
}
