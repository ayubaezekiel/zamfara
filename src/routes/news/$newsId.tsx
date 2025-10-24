import { NewsMarkdown } from '@/components/News'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useBlogQueryById } from '@/hooks/queries'
import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'

export const Route = createFileRoute('/news/$newsId')({
  component: NewsPostPage,
})

function NewsPostPage() {
  const { newsId } = Route.useParams()
  const postId = newsId

  const {
    data: post,
    isPending: postLoading,
    error: postError,
  } = useBlogQueryById(postId)
  if (postLoading) {
    return <PostSkeleton />
  }

  if (postError || !post) {
    return <NotFound />
  }

  const readingTime = Math.ceil(200 / 200) // ~200 wpm

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background py-16 mt-24"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link to="/news">
          <Button variant="ghost" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Button>
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.tags.split(',').map((tag: string) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag.trim()}
              </Badge>
            ))}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readingTime} min read
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl">
              {post.summary}
            </p>
          )}
        </header>

        {/* Markdown Content */}
        <Card className="border-0 shadow-lg">
          <CardContent className="prose prose-lg max-w-none p-8 md:p-10">
            <NewsMarkdown contentUrl={post.contentPath} />
          </CardContent>
        </Card>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link to="/news">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              More News
            </Button>
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

// === SKELETON LOADER ===
function PostSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Skeleton className="h-10 w-32 mb-8" />
      <Skeleton className="h-12 w-full mb-4" />
      <Skeleton className="h-6 w-3/4 mb-8" />
      <Skeleton className="h-96 w-full rounded-2xl mb-12" />
      <Card>
        <CardContent className="p-8 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    </div>
  )
}

// === 404 FALLBACK ===
function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">News post not found</p>
      <Link to="/news">
        <Button>Back to News</Button>
      </Link>
    </div>
  )
}
