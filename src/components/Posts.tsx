import {
  useCreateBlogPostMutation,
  useDeleteBlogPostMutation,
} from "@/hooks/mutations";
import { useBlogQuery } from "@/hooks/queries";
import { useQueryClient } from "@tanstack/react-query";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Edit,
  Eye,
  EyeOff,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BlogPostModal } from "./forms/blog-post";
import { MarkdownPreviewModal } from "./modals/markdown-preview";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

export function Posts() {
  const { data, isPending } = useBlogQuery();

  const queryClient = useQueryClient();

  const createMutation = useCreateBlogPostMutation();
  const deleteMutation = useDeleteBlogPostMutation();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostType | null>(null);

  const [previewPost, setPreviewPost] = useState<BlogPostType | null>(null);

  const handlePreview = (post: BlogPostType) => {
    setPreviewPost(post);
  };

  const handleClosePreview = () => {
    setPreviewPost(null);
  };

  const columns = useMemo<ColumnDef<BlogPostType>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="font-medium text-gray-900 max-w-xs truncate">
            {row.getValue("title")}
          </div>
        ),
      },
      {
        accessorKey: "author",
        header: "Author",
        cell: ({ row }) => (
          <div className="text-gray-600">{row.getValue("author")}</div>
        ),
      },
      {
        accessorKey: "publishDate",
        header: "Publish Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("publishDate"));
          return (
            <div className="text-gray-600">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          );
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
          const tags =
            (row.getValue("tags") as string)
              ?.split(",")
              .map((t) => t.trim())
              .filter(Boolean) || [];
          return (
            <div className="flex gap-1 flex-wrap max-w-xs">
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "isPublished",
        header: "Status",
        cell: ({ row }) => {
          const isPublished = row.getValue("isPublished");
          return (
            <div className="flex items-center gap-1">
              {isPublished ? (
                <>
                  <Eye className="w-4 h-4 text-teal-600" />
                  <span className="text-teal-700 font-medium">Published</span>
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">Draft</span>
                </>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "$updatedAt",
        header: "Last Updated",
        cell: ({ row }) => {
          const date = new Date(row.getValue("$updatedAt"));
          return (
            <div className="text-gray-500 text-sm">
              {date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const post = row.original;
          return (
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(post)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </button>

              {/* Preview Button */}
              <button
                onClick={() => handlePreview(post)}
                className="p-2 text-teal-600 hover:bg-teal-50 rounded transition-colors"
                title="Preview Markdown"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleDelete(post)}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          );
        },
      },
    ],
    [deleteMutation.isPending]
  );

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  const handleEdit = (post: BlogPostType) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = async (post: BlogPostType) => {
    const confirmed = await toast.promise(
      new Promise((resolve) => {
        toast(
          <div className="flex flex-col gap-4">
            <p>Delete "{post.title}"?</p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  toast.dismiss();
                  resolve(false);
                }}
                className="px-3 py-1 text-sm border rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  toast.dismiss();
                  resolve(true);
                }}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>,
          { duration: Infinity }
        );
      }),
      {
        loading: "Deleting...",
        success: "Post deleted!",
        error: "Failed to delete",
      }
    );

    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(post.$id);
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    } catch {
      // Error already toasted
    }
  };

  const handleCreateNew = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleSubmitSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    handleCloseModal();
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  const total = data?.length || 0;
  const published = data?.filter((p) => p.isPublished).length || 0;
  const drafts = total - published;
  const thisMonth =
    data?.filter((p) => {
      const date = new Date(p.$createdAt);
      const now = new Date();
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }).length || 0;

  return (
    <div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <Card className="bg-background shadow-lg border-0 rounded-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl bg-linear-to-r from-teal-700 to-indigo-600 text-transparent bg-clip-text">
              Blog Admin
            </CardTitle>
            <p className="mt-2 text-gray-600">
              Manage your blog posts and content
            </p>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Total Posts</div>
            <div className="mt-2 text-3xl font-bold text-gray-900">{total}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Published</div>
            <div className="mt-2 text-3xl font-bold text-teal-600">
              {published}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">Drafts</div>
            <div className="mt-2 text-3xl font-bold text-gray-600">
              {drafts}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500">This Month</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {thisMonth}
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-lg shadow">
          {/* Toolbar */}
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <Button
              onClick={handleCreateNew}
              disabled={createMutation.isPending}
              className="bg-teal-700 hover:bg-teal-700"
            >
              <Plus className="w-5 h-5" />
              New Post
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort()
                                ? "flex items-center gap-1 cursor-pointer select-none"
                                : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getCanSort() && (
                              <>
                                {header.column.getIsSorted() === "asc" ? (
                                  <ChevronUp className="w-4 h-4 text-gray-600" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ChevronDown className="w-4 h-4 text-gray-600" />
                                ) : (
                                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No posts found
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-6 py-4 whitespace-nowrap"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {table.getPageCount() > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span>
                  Showing{" "}
                  <span className="font-medium">
                    {table.getState().pagination.pageIndex *
                      table.getState().pagination.pageSize +
                      1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {table.getFilteredRowModel().rows.length}
                  </span>{" "}
                  results
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  First
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page{" "}
                  <span className="font-medium">
                    {table.getState().pagination.pageIndex + 1}
                  </span>{" "}
                  of <span className="font-medium">{table.getPageCount()}</span>
                </span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Next
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <BlogPostModal
          post={editingPost}
          onClose={handleCloseModal}
          onSuccess={handleSubmitSuccess}
        />
      )}
      {/* Markdown Preview Modal */}
      {previewPost && (
        <MarkdownPreviewModal
          contentUrl={previewPost.contentPath}
          title={previewPost.title}
          open={!!previewPost}
          onOpenChange={(open) => !open && handleClosePreview()}
        />
      )}
    </div>
  );
}
