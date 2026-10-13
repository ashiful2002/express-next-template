# SaaS Reusable Component System Documentation

A production-grade, accessible, and scalable component architecture for the Next.js SaaS frontend application (`Next-template`). Built on top of **shadcn/ui (Base-Mira preset)**, **Base UI (`@base-ui/react`)**, **HugeIcons (`@hugeicons/react`)**, and **Tailwind CSS v4**.

---

## 1. Architectural Layers & Directory Structure

The system is organized into clean, single-responsibility layers:

```text
Next-template/
├── components/
│   ├── ui/                 # 1. Existing shadcn primitives (Button, Card, Input, Label)
│   ├── common/             # 2. Foundation wrappers (AppButton, AppCard, AppBadge, AppSkeleton, AppSeparator, AppTooltip)
│   ├── layout/             # 3. SaaS page layouts (PageContainer, PageHeader, PageSection, PageBreadcrumbs, PageTabs, AppSidebar)
│   ├── forms/              # 4. Form controls with accessible labels & validation (FormField, FormInput, FormTextarea, FormSelect, FormCheckbox, FormDatePicker, FormSubmitButton)
│   ├── overlays/           # 5. Modals & floating overlays (AppDialog, ConfirmDialog, AppSheet, AppPopover, AppDropdownMenu)
│   ├── data-display/       # 6. Tables, lists & metrics (AppTable, AppPagination, SearchInput, FilterBar, StatusBadge, StatCard, DataToolbar, DataViewToggle, UserAvatar, UserMenu)
│   ├── feedback/           # 7. User feedback & alerts (AppAlert, AppAlertDialog, AppToaster, InlineError, PermissionDenied)
│   └── states/             # 8. Semantic UI states (LoadingState, EmptyState, NoResultsState, ErrorState, NotFoundState, AccessDeniedState, PageSkeleton, TableSkeleton)
├── app/                    # 9. Next.js App Router boundaries (loading.tsx, error.tsx, not-found.tsx)
└── docs/                   # 10. Engineering guidelines & component documentation
```

---

## 2. Responsibilities of Each Layer

1. **`components/ui/` (Primitives)**: Pure visual building blocks. Preserves Base UI and shadcn defaults. Direct consumption when no SaaS-specific behavior is required.
2. **`components/common/` (Foundations)**: Extends primitives with application conveniences (loading spinners, slots, semantic variants, required indicators).
3. **`components/layout/` (Structure)**: Guarantees responsive margins, max-width constraints, breadcrumbs, and standard page headers across all SaaS views.
4. **`components/forms/` (Form System)**: Couples controls with labels, error messages (`role="alert"`), and ARIA attributes (`aria-invalid`, `aria-describedby`) for 100% accessible form handling.
5. **`components/overlays/` (Dialogs & Panels)**: Accessible modal dialogs, slide-over sheets, and confirmation dialogs with pending/loading protection.
6. **`components/data-display/` (Data & Metrics)**: Standardized tables, pagination, filter bars, status badges, metric cards, and user avatars.
7. **`components/states/` (UI State System)**: Explicit, semantically distinct states for loading, empty datasets, zero search results, errors, 404s, and 403s.

---

## 3. When to Use What

| Requirement | Recommended Component | Rationale |
| :--- | :--- | :--- |
| Standard action with loading state | `<AppButton isLoading={loading}>` | Automatically disables, shows spinner, prevents double-clicks. |
| Page container with standard gutters | `<PageContainer maxWidth="7xl">` | Enforces responsive padding and max-width. |
| Page title and action bar | `<PageHeader title="..." actions="...">` | Aligns heading, description, breadcrumbs, and actions responsively. |
| Text input with label & error message | `<FormInput id="email" label="Email" error={...}>` | Generates accessible labels, `aria-invalid`, and error messages. |
| Action confirmation (e.g., delete) | `<ConfirmDialog onConfirm={...} isDestructive>` | Built-in cancel/confirm buttons, pending spinner, prevents accidental triggers. |
| Side panel / drawer inspection | `<AppSheet side="right" title="...">` | Slide-in panel for filters or detail inspection. |
| Data table with stripes & hover | `<AppTable striped hoverable>` | Accessible semantic markup with responsive overflow container. |
| Dataset pagination | `<AppPagination page={1} totalPages={10}>` | Boundary-safe page controls with rows-per-page selector. |
| Initial data loading | `<PageSkeleton />` or `<TableSkeleton />` | Lowers perceived latency compared to blank screens. |
| Search filter returns zero records | `<NoResultsState onClear={...}>` | Distinct from `<EmptyState>`: guides user to reset active filters. |
| Global or route errors | `<ErrorState onRetry={...}>` | Safe error message without leaking stack traces or sensitive internals. |

---

## 4. Practical Usage Examples

### A. SaaS Dashboard Page Layout

```tsx
import { PageContainer } from "@/components/layout/page-container"
import { PageHeader } from "@/components/layout/page-header"
import { PageBreadcrumbs } from "@/components/layout/page-breadcrumbs"
import { StatCard } from "@/components/data-display/stat-card"
import { AppButton } from "@/components/common/app-button"
import { HugeiconsIcon } from "@hugeicons/react"
import { PlusSignIcon, Coins01Icon, UserGroupIcon } from "@hugeicons/core-free-icons"

export default function DashboardView() {
  return (
    <PageContainer>
      <PageHeader
        title="Workspace Overview"
        description="Monitor active metrics, customer activity, and performance trends."
        breadcrumbs={
          <PageBreadcrumbs items={[{ label: "Dashboard", href: "/dashboard" }]} />
        }
        actions={
          <AppButton>
            <HugeiconsIcon icon={PlusSignIcon} className="size-3.5" />
            <span>New Transaction</span>
          </AppButton>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          icon={<HugeiconsIcon icon={Coins01Icon} />}
          trend={{ value: "+20.1%", direction: "up", label: "from last month" }}
        />
        <StatCard
          title="Active Users"
          value="2,350"
          icon={<HugeiconsIcon icon={UserGroupIcon} />}
          trend={{ value: "+4.5%", direction: "up" }}
        />
      </div>
    </PageContainer>
  )
}
```

### B. Accessible Form with Validation

```tsx
"use client"

import { useState } from "react"
import { FormInput } from "@/components/forms/form-input"
import { FormSelect } from "@/components/forms/form-select"
import { FormCheckbox } from "@/components/forms/form-checkbox"
import { FormSubmitButton } from "@/components/forms/form-submit-button"

export function CreateProjectForm() {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [terms, setTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Handle API submission
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <FormInput
        id="project-name"
        label="Project Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
        description="Must be between 3 and 50 characters."
      />

      <FormSelect
        id="project-role"
        label="Default Role"
        required
        value={role}
        onChange={(e) => setRole(e.target.value)}
        options={[
          { value: "admin", label: "Administrator" },
          { value: "member", label: "Team Member" },
          { value: "viewer", label: "Viewer" },
        ]}
      />

      <FormCheckbox
        id="terms"
        label="Accept operational policy"
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
      />

      <FormSubmitButton isSubmitting={isSubmitting} submittingText="Creating...">
        Create Project
      </FormSubmitButton>
    </form>
  )
}
```

### C. Data Table with Search, Filter & State Handling

```tsx
import { AppTable, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/data-display/app-table"
import { DataToolbar } from "@/components/data-display/data-toolbar"
import { SearchInput } from "@/components/data-display/search-input"
import { StatusBadge } from "@/components/data-display/status-badge"
import { AppPagination } from "@/components/data-display/app-pagination"
import { TableSkeleton } from "@/components/states/table-skeleton"
import { NoResultsState } from "@/components/states/no-results-state"

export function CustomerTable({ customers, isLoading, search, onSearch, onClear, page, totalPages }) {
  if (isLoading) return <TableSkeleton rows={5} columns={4} />

  if (customers.length === 0 && search) {
    return <NoResultsState query={search} onClear={onClear} />
  }

  return (
    <div className="space-y-4">
      <DataToolbar
        search={
          <SearchInput value={search} onChange={(e) => onSearch(e.target.value)} onClear={onClear} />
        }
      />

      <AppTable striped hoverable>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell className="text-muted-foreground">{c.email}</TableCell>
              <TableCell>
                <StatusBadge status={c.status} />
              </TableCell>
              <TableCell className="text-right">...</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </AppTable>

      <AppPagination page={page} totalPages={totalPages} onPageChange={() => {}} />
    </div>
  )
}
```

### D. Destructive Action Confirmation

```tsx
import { useState } from "react"
import { ConfirmDialog } from "@/components/overlays/confirm-dialog"
import { Button } from "@/components/ui/button"

export function DeleteUserAction({ userId, userName }) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      // await api.deleteUser(userId)
      setOpen(false)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Delete User
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title={`Delete ${userName}?`}
        description="This action cannot be undone. All active sessions and associated customer records will be permanently removed."
        confirmLabel="Yes, delete user"
        isDestructive
        isPending={isDeleting}
        onConfirm={handleDelete}
      />
    </>
  )
}
```

---

## 5. Adding Future Feature-Specific Components

When implementing domain features (e.g., Invoices, Teams, Customers), structure them inside feature folders:

```text
features/
└── invoices/
    ├── components/
    │   ├── invoice-table.tsx          # Composes AppTable, StatusBadge
    │   ├── invoice-form.tsx           # Composes FormField, FormInput
    │   ├── invoice-card.tsx           # Composes AppCard
    │   └── delete-invoice-dialog.tsx  # Composes ConfirmDialog
    ├── hooks/                         # Feature hooks (e.g., useInvoices)
    └── types/                         # Feature types (e.g., IInvoice)
```

Keep API requests, state mutations, and business logic inside the feature components or custom hooks, keeping the shared UI foundation presentational and reusable across future projects.

