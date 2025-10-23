import { Link, createLazyFileRoute } from '@tanstack/react-router'
;('use client')

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBlogQuery } from '@/hooks/queries' // Your query hook
import { motion } from 'framer-motion'
import { Calendar, Clock, Search, Tag } from 'lucide-react'
import { useState } from 'react'

export const Route = createLazyFileRoute('/news/')({
  component: NewsPage,
})

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 100 },
  },
}

function NewsPage() {
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('all')
  const [page, setPage] = useState(1)
  const postsPerPage = 6

  const { data: posts, isPending } = useBlogQuery() // Fetches all published posts

  // Filter & paginate
  const filteredPosts =
    posts?.filter(
      (post) =>
        post.isPublished &&
        (search === '' ||
          post.title.toLowerCase().includes(search.toLowerCase())) &&
        (tagFilter === 'all' || post.tags?.includes(tagFilter)),
    ) || []

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage,
  )
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const featuredPost = filteredPosts[0] // Latest for hero

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-48 bg-gray-200 rounded-lg" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-3 bg-gray-200 rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background mt-24">
      {/* Hero: Featured Post */}
      {featuredPost && (
        <section className="relative overflow-hidden bg-linear-to-r from-emerald-50 to-teal-50 py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div>
                <Badge variant="secondary" className="mb-4">
                  Featured News
                </Badge>
                <h1 className="text-3xl md:text-5xl font-bold text-emerald-900 mb-4">
                  {featuredPost.title}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  {featuredPost.summary}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.publishDate).toLocaleDateString()}
                  </div>
                  {featuredPost.tags &&
                    featuredPost.tags.split(',').map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag.trim()}
                      </Badge>
                    ))}
                </div>
                <Link
                  to={'/news/$newsId'}
                  params={{ newsId: featuredPost.$id }}
                >
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Read Full Story
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <img
                  src={'/news.webp'}
                  alt={featuredPost.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Posts Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex-1"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post) => (
                  <motion.div key={post.$id} variants={itemVariants}>
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                      <CardHeader className="p-0">
                        <img
                          src={'/news.webp'}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          {post.tags
                            ?.split(',')
                            .slice(0, 2)
                            .map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag.trim()}
                              </Badge>
                            ))}
                        </div>
                        <CardTitle className="text-xl font-bold mb-2 hover:text-emerald-600 transition-colors">
                          <Link
                            to={'/news/$newsId'}
                            params={{ newsId: post.$id }}
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-gray-600 mb-4 line-clamp-3">
                          {post.summary}
                        </CardDescription>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />5 min read
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-10">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (p) => (
                          <PaginationItem key={p}>
                            <PaginationLink
                              href="#"
                              isActive={p === page}
                              onClick={() => setPage(p)}
                            >
                              {p}
                            </PaginationLink>
                          </PaginationItem>
                        ),
                      )}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={() =>
                            setPage((p) => Math.min(totalPages, p + 1))
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:w-80 space-y-6">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search News
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Tags Filter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Filter by Tag
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={tagFilter} onValueChange={setTagFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {/* Dynamically generate from posts */}
                      {[
                        ...new Set(
                          posts
                            ?.flatMap((p) => p.tags?.split(',') || [])
                            ?.map((t) => t.trim()) || [],
                        ),
                      ].map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {filteredPosts.slice(0, 5).map((post) => (
                      <li key={post.$id}>
                        <Link
                          to={'/news'}
                          params={{ newsId: post.$id }}
                          className="text-sm font-medium text-emerald-600 hover:underline"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
