type BaseType = {
  $id: string
  $sequence: number
  $createdAt: string
  $updatedAt: string
  $permissions: Array<string>
  $databaseId: string
  $tableId: string
}

interface BlogPostType extends BaseType {
  title: string
  publishDate: string
  summary: string
  contentPath: string
  tags: string
  isPublished: true
  author: string
}

interface SchedulesType extends BaseType {
  eventName: string
  startDate: string
  endDate: string
  location: string
  createdBy: string
  notice: string
  status?: string
}
