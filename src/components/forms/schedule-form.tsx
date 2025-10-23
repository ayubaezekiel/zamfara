import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  useCreateScheduleMutation,
  useUpdateScheduleMutation,
} from '@/hooks/mutations'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

interface ScheduleFormModalProps {
  schedule: SchedulesType | null
  onClose: () => void
  onSuccess: () => void
}

export function ScheduleFormModal({
  schedule,
  onClose,
  onSuccess,
}: ScheduleFormModalProps) {
  const isEditMode = !!schedule

  const createMutation = useCreateScheduleMutation()
  const updateMutation = useUpdateScheduleMutation()
  const isPending = createMutation.isPending || updateMutation.isPending

  const form = useForm({
    defaultValues: {
      eventName: schedule?.eventName || '',
      startDate: schedule?.startDate || '',
      endDate: schedule?.endDate || '',
      location: schedule?.location || '',
      createdBy: schedule?.createdBy || '',
      notice: schedule?.notice || '',
      status: schedule?.notice || 'Upcoming',
    },
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode) {
          if (!schedule?.$id) {
            toast.error('Invalid schedule ID')
            return
          }

          await updateMutation.mutateAsync({
            documentId: schedule.$id,
            eventName: value.eventName,
            startDate: value.startDate,
            endDate: value.endDate,
            location: value.location,
            createdBy: value.createdBy,
            notice: value.notice,
          })

          toast.success('Schedule updated successfully!')
          onSuccess()
        } else {
          await createMutation.mutateAsync({
            eventName: value.eventName,
            startDate: value.startDate,
            endDate: value.endDate,
            location: value.location,
            createdBy: value.createdBy,
            notice: value.notice,
          })

          toast.success('Schedule created successfully!')
          form.reset()
          onSuccess()
        }
      } catch (error: any) {
        toast.error(
          `Error ${isEditMode ? 'updating' : 'creating'} schedule: ${
            error?.message || 'Unknown error'
          }`,
        )
      }
    },
    // Validation rules
    validators: {
      onChange({ value }) {
        const errors: Record<string, string> = {}
        if (!value.eventName) errors.eventName = 'Event name is required'
        if (!value.startDate) errors.startDate = 'Start date is required'
        if (!value.endDate) errors.endDate = 'End date is required'
        if (!value.createdBy) errors.createdBy = 'Creator name is required'
        if (
          value.startDate &&
          value.endDate &&
          new Date(value.startDate) > new Date(value.endDate)
        ) {
          errors.endDate = 'End date must be after start date'
        }
        return Object.keys(errors).length > 0 ? errors : undefined
      },
    },
  })

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {isEditMode ? 'Edit Schedule' : 'Create New Schedule'}
          </DialogTitle>
        </DialogHeader>
        <form
          className="space-y-6 p-6"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          {/* Event Name */}
          <form.Field name="eventName">
            {(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor="eventName"
                  className="text-sm font-medium text-gray-700"
                >
                  Event Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="eventName"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter event name"
                  required
                  className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Grid: Start Date, End Date, Created By */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form.Field name="startDate">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="startDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    Start Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="endDate">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="endDate"
                    className="text-sm font-medium text-gray-700"
                  >
                    End Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    required
                    className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="createdBy">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="createdBy"
                    className="text-sm font-medium text-gray-700"
                  >
                    Created By <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="createdBy"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter creator name"
                    required
                    className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Location */}
            <form.Field name="location">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="location"
                    className="text-sm font-medium text-gray-700"
                  >
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter event location"
                    className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>{' '}
            {/* Location */}
            <form.Field name="status">
              {(field) => (
                <div className="space-y-2">
                  <Label
                    htmlFor="upcoming..."
                    className="text-sm font-medium text-gray-700"
                  >
                    Status
                  </Label>
                  <Input
                    id="status"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter event location"
                    className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                  />
                  {field.state.meta.errors && (
                    <p className="text-sm text-red-600">
                      {field.state.meta.errors.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          {/* Notice */}
          <form.Field name="notice">
            {(field) => (
              <div className="space-y-2">
                <Label
                  htmlFor="notice"
                  className="text-sm font-medium text-gray-700"
                >
                  Notice
                </Label>
                <Textarea
                  id="notice"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter any additional notes or notices"
                  rows={4}
                  className="border-gray-300 focus:ring-teal-500 focus:border-teal-500"
                />
                {field.state.meta.errors && (
                  <p className="text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              size="lg"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
              size="lg"
            >
              {isPending
                ? isEditMode
                  ? 'Updating...'
                  : 'Creating...'
                : isEditMode
                  ? 'Update Schedule'
                  : 'Create Schedule'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
