import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
} from '@/hooks/mutations'
import { useForm } from '@tanstack/react-form'
import { Upload, X } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface BlogPostModalProps {
  post: BlogPostType | null
  onClose: () => void
  onSuccess: () => void
}

export function BlogPostModal({
  post,
  onClose,
  onSuccess,
}: BlogPostModalProps) {
  const isEditMode = !!post
  const [file, setFile] = useState<File | null>(null)

  const createMutation = useCreateBlogPostMutation()
  const updateMutation = useUpdateBlogPostMutation()

  const isPending = createMutation.isPending || updateMutation.isPending

  const form = useForm({
    defaultValues: {
      title: post?.title || '',
      author: post?.author || '',
      publishDate: post?.publishDate || new Date().toISOString().split('T')[0],
      summary: post?.summary || '',
      tags: post?.tags || '',
      isPublished: post?.isPublished ?? false,
    },
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode) {
          if (!post?.$id) {
            toast.error('Invalid post ID')
            return
          }

          await updateMutation.mutateAsync({
            documentId: post.$id,
            title: value.title,
            author: value.author,
            publishDate: value.publishDate,
            summary: value.summary || null,
            tags: value.tags || null,
            isPublished: value.isPublished,
            file: file || undefined,
          })

          toast.success('Blog post updated successfully!')
          onSuccess()
        } else {
          // Create mode
          if (!file) {
            toast.error('Please upload a markdown file')
            return
          }

          await createMutation.mutateAsync({
            ...value,
            file,
          })

          toast.success('Blog post created successfully!')
          form.reset()
          setFile(null)
          onSuccess()
        }
      } catch (error: any) {
        toast.error(
          `Error ${isEditMode ? 'updating' : 'creating'} blog post: ${
            error?.message || 'Unknown error'
          }`,
        )
      }
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.name.endsWith('.md')) {
      toast.error('Please upload a valid .md (Markdown) file')
      e.target.value = ''
      return
    }

    setFile(selectedFile)
  }

  const currentFileName = post?.contentPath
    ? decodeURIComponent(post.contentPath.split('/').pop() || '')
    : null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          <form
            className="p-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            {/* Title */}
            <form.Field name="title">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter blog post title"
                    required
                  />
                </div>
              )}
            </form.Field>

            {/* Grid: Author, Tags, Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <form.Field name="author">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="author">Author *</Label>
                    <Input
                      id="author"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="tags">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="react, typescript"
                    />
                  </div>
                )}
              </form.Field>

              <form.Field name="publishDate">
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="publishDate">Publish Date *</Label>
                    <Input
                      id="publishDate"
                      type="date"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                    />
                  </div>
                )}
              </form.Field>
            </div>

            {/* Summary */}
            <form.Field name="summary">
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Brief description of your blog post"
                    rows={3}
                  />
                </div>
              )}
            </form.Field>

            {/* File Upload */}
            <div className="space-y-2">
              <Label>
                Markdown File{' '}
                {isEditMode ? (
                  '(optional)'
                ) : (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                <input
                  id="markdown-file"
                  type="file"
                  accept=".md"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="markdown-file"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-10 h-10 text-slate-400" />
                  <span className="text-sm text-slate-600">
                    {file ? file.name : 'Click to upload .md file'}
                  </span>
                  <span className="text-xs text-slate-400">
                    Markdown files only (.md)
                  </span>
                </label>
              </div>

              {/* Show current file in edit mode */}
              {isEditMode && currentFileName && !file && (
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  Current:{' '}
                  <span className="font-medium">{currentFileName}</span>
                </p>
              )}
            </div>

            {/* Publish Toggle */}
            <form.Field name="isPublished">
              {(field) => (
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="isPublished" className="text-base">
                      Publish Post
                    </Label>
                    <p className="text-sm text-slate-500">
                      Make this post visible to readers
                    </p>
                  </div>
                  <Switch
                    id="isPublished"
                    checked={field.state.value}
                    onCheckedChange={field.handleChange}
                  />
                </div>
              )}
            </form.Field>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                size="lg"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || (!file && !isEditMode)}
                className="flex-1"
                size="lg"
              >
                {isPending
                  ? isEditMode
                    ? 'Updating...'
                    : 'Creating...'
                  : isEditMode
                    ? 'Update Post'
                    : 'Create Post'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
