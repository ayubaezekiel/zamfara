import { useSchedulesQuery } from "@/hooks/queries";
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
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScheduleFormModal } from "./forms/schedule-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
} from "@/hooks/mutations";
import { Badge } from "./ui/badge";

export function Schedule() {
  const { data, isPending } = useSchedulesQuery();
  const queryClient = useQueryClient();
  const createMutation = useCreateScheduleMutation();
  const deleteMutation = useDeleteScheduleMutation();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<SchedulesType | null>(
    null
  );

  const columns = useMemo<ColumnDef<SchedulesType>[]>(
    () => [
      {
        accessorKey: "eventName",
        header: "Event Name",
        cell: ({ row }) => (
          <div className="font-medium text-gray-900 max-w-xs truncate">
            {row.getValue("eventName")}
          </div>
        ),
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("startDate"));
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
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => {
          const date = new Date(row.getValue("endDate"));
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
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
          <div className="text-gray-600">
            {row.getValue("location") || "N/A"}
          </div>
        ),
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        cell: ({ row }) => (
          <div className="text-gray-600">{row.getValue("createdBy")}</div>
        ),
      },
      {
        accessorKey: "notice",
        header: "Notice",
        cell: ({ row }) => (
          <div className="text-gray-600 max-w-xs truncate">
            {row.getValue("notice")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge>{row.getValue("status")}</Badge>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const schedule = row.original;
          return (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(schedule)}
                className="border-teal-700 text-teal-700 hover:bg-teal-70"
                title="Edit"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(schedule)}
                title="Delete"
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
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

  const handleEdit = (schedule: SchedulesType) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleDelete = async (schedule: SchedulesType) => {
    const confirmed = toast.promise(
      new Promise((resolve) => {
        toast(
          <div className="flex flex-col gap-4">
            <p>Delete "{schedule.eventName}"?</p>
            <div className="flex gap-2 justify-end">
              <Button
                onClick={() => {
                  toast.dismiss();
                  resolve(false);
                }}
                className="px-3 py-1 text-sm border rounded"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toast.dismiss();
                  resolve(true);
                }}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded"
              >
                Delete
              </Button>
            </div>
          </div>,
          { duration: Infinity }
        );
      }),
      {
        loading: "Deleting...",
        success: "Schedule deleted!",
        error: "Failed to delete",
      }
    );

    if (!confirmed) return;

    try {
      await deleteMutation.mutateAsync(schedule.$id);
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    } catch {
      // Error already toasted
    }
  };

  const handleCreateNew = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const handleSubmitSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["schedules"] });
    handleCloseModal();
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-linear-to-br from-background to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schedules...</p>
        </div>
      </div>
    );
  }

  const total = data?.length || 0;
  const upcoming =
    data?.filter((s) => new Date(s.startDate) >= new Date()).length || 0;

  const thisMonth =
    data?.filter((s) => {
      const date = new Date(s.startDate);
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
              Schedule Management
            </CardTitle>
            <p className="mt-2 text-gray-600">
              Manage your medical outreach schedules
            </p>
          </CardHeader>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-background shadow-lg border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-gray-500">
                Total Schedules
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900">
                {total}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-lg border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-gray-500">Upcoming</div>
              <div className="mt-2 text-3xl font-bold text-teal-700">
                {upcoming}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background shadow-lg border-0 rounded-2xl">
            <CardContent className="p-6">
              <div className="text-sm font-medium text-gray-500">
                This Month
              </div>
              <div className="mt-2 text-3xl font-bold text-indigo-600">
                {thisMonth}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table Card */}
        <Card className="bg-background shadow-lg border-0 rounded-2xl">
          <CardContent className="p-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search schedules..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-700 focus:border-transparent outline-none"
                />
              </div>
              <Button
                onClick={handleCreateNew}
                disabled={createMutation.isPending}
                className="bg-teal-700 hover:bg-teal-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Schedule
              </Button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50 border-b border-gray-200">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead
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
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="bg-white divide-y divide-gray-200">
                  {table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No schedules found
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
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
                  <Button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    First
                  </Button>
                  <Button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-700">
                    Page{" "}
                    <span className="font-medium">
                      {table.getState().pagination.pageIndex + 1}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{table.getPageCount()}</span>
                  </span>
                  <Button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Next
                  </Button>
                  <Button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Last
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ScheduleFormModal
          schedule={editingSchedule}
          onClose={handleCloseModal}
          onSuccess={handleSubmitSuccess}
        />
      )}
    </div>
  );
}
