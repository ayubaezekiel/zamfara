import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Download, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Highlight, themes } from 'prism-react-renderer'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

interface MarkdownPreviewModalProps {
  contentUrl: string
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MarkdownPreviewModal({
  contentUrl,
  title,
  open,
  onOpenChange,
}: MarkdownPreviewModalProps) {
  const [markdown, setMarkdown] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open) return

    setLoading(true)
    setError(false)
    setMarkdown(null)

    fetch(contentUrl, { credentials: 'include' })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.text()
      })
      .then((text) => {
        setMarkdown(text)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [contentUrl, open])

  const handleDownload = () => {
    if (!markdown) return
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-3 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex gap-4 text-xl font-semibold">
              Preview: {title}
              <div className="flex items-center gap-2">
                {markdown && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download .md
                  </Button>
                )}
              </div>
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin mb-3" />
              <p>Loading markdown...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 text-red-600">
              <p>Failed to load markdown file.</p>
              <p className="text-sm mt-2">Check file URL or permissions.</p>
            </div>
          )}

          {markdown && (
            <article className="prose prose-sm md:prose-base lg:prose-lg max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    const inline = !match

                    if (inline) {
                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      )
                    }

                    return (
                      <Highlight
                        theme={themes.vsDark}
                        code={String(children).replace(/\n$/, '')}
                        language={match[1]}
                      >
                        {({
                          className,
                          style,
                          tokens,
                          getLineProps,
                          getTokenProps,
                        }) => (
                          <pre
                            className={className}
                            style={{
                              ...style,
                              padding: '1rem',
                              borderRadius: '0.5rem',
                              overflow: 'auto',
                              marginTop: '0.5rem',
                              marginBottom: '0.5rem',
                            }}
                          >
                            {tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                  <span
                                    key={key}
                                    {...getTokenProps({ token })}
                                  />
                                ))}
                              </div>
                            ))}
                          </pre>
                        )}
                      </Highlight>
                    )
                  },
                }}
              >
                {markdown}
              </ReactMarkdown>
            </article>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
