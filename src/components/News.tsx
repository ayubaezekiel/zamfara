import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Highlight, themes } from "prism-react-renderer";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface MarkdownPreviewModalProps {
  contentUrl: string;
}

export function NewsMarkdown({ contentUrl }: MarkdownPreviewModalProps) {
  const [markdown, setMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setMarkdown(null);

    fetch(contentUrl, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.text();
      })
      .then((text) => {
        setMarkdown(text);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contentUrl]);

  return (
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
                const match = /language-(\w+)/.exec(className || "");
                const inline = !match;

                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                return (
                  <Highlight
                    theme={themes.vsDark}
                    code={String(children).replace(/\n$/, "")}
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
                          padding: "1rem",
                          borderRadius: "0.5rem",
                          overflow: "auto",
                        }}
                      >
                        {tokens.map((line, i) => (
                          <div key={i} {...getLineProps({ line })}>
                            {line.map((token, key) => (
                              <span key={key} {...getTokenProps({ token })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                );
              },
            }}
          >
            {markdown}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
}
