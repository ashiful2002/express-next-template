"use client"

import * as React from "react"
import {
  LayoutDashboard,
  GraduationCap,
  School,
  BookOpen,
  CalendarRange,
  CalendarClock,
  ClipboardCheck,
  ListChecks,
  NotebookPen,
  FileSignature,
  Trophy,
  Wallet,
  Receipt,
  CreditCard,
  HandCoins,
  Megaphone,
  BarChart3,
  UserCog,
  Settings,
  Sparkles,
  Building2,
  ShieldAlert,
  Users,
  Layers,
  LifeBuoy,
  ScrollText,
  Activity,
} from "lucide-react"

import { NavMain, NavGroup } from "@/src/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar"

type NavItem = NavGroup["items"][number]

type PermissionNavItem = NavItem & { permission?: string }
type PermissionNavGroup = { label: string; items: PermissionNavItem[] }

export type TerminologyMap = Partial<
  Record<
    | "student"
    | "classGroup"
    | "subject"
    | "assessment"
    | "academicYear"
    | "fee",
    string
  >
>

const can = (permissions: readonly string[] | undefined, needed?: string) =>
  !needed || !!permissions?.includes("*") || !!permissions?.includes(needed)

export function buildSidebarGroups(
  labels: TerminologyMap = {}
): PermissionNavGroup[] {
  const students = labels.student ?? "Students"
  const classes = labels.classGroup ?? "Classes"
  const subjects = labels.subject ?? "Subjects"
  const exams = labels.assessment ?? "Exams"
  const years = labels.academicYear ?? "Academic Years"
  const fees = labels.fee ?? "Fees"

  return [
    {
      label: "Main",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          isImplemented: true,
        },
      ],
    },
    {
      label: "Academics",
      items: [
        {
          title: students,
          url: "/dashboard/students",
          icon: GraduationCap,
          permission: "students.view",
          isImplemented: true,
        },
        {
          title: classes,
          url: "/dashboard/classes",
          icon: School,
          permission: "classes.view",
          isImplemented: true,
        },
        {
          title: subjects,
          url: "/dashboard/subjects",
          icon: BookOpen,
          permission: "subjects.view",
          isImplemented: true,
        },
        {
          title: years,
          url: "/dashboard/academic-years",
          icon: CalendarRange,
          permission: "academicYears.manage",
          isImplemented: true,
        },
      ],
    },
    {
      label: "Teaching",
      items: [
        {
          title: "Routine",
          url: "/dashboard/routine",
          icon: CalendarClock,
          permission: "sessions.view",
          isImplemented: true,
        },
        {
          title: "Attendance",
          url: "/dashboard/attendance",
          icon: ClipboardCheck,
          permission: "attendance.view",
          isImplemented: true,
        },
        {
          title: "Syllabus & Progress",
          url: "/dashboard/progress",
          icon: ListChecks,
          permission: "progress.view",
          isImplemented: false,
        },
        {
          title: "Homework",
          url: "/dashboard/homework",
          icon: NotebookPen,
          permission: "homework.view",
          isImplemented: false,
        },
      ],
    },
    {
      label: `${exams} & Results`,
      items: [
        {
          title: exams,
          url: "/dashboard/exams",
          icon: FileSignature,
          permission: "assessments.view",
          isImplemented: true,
        },
        {
          title: "Results",
          url: "/dashboard/results",
          icon: Trophy,
          permission: "results.view",
          isImplemented: true,
        },
      ],
    },
    {
      label: "Finance",
      items: [
        {
          title: fees,
          url: "/dashboard/fees",
          icon: Wallet,
          permission: "fees.view",
          isImplemented: true,
        },
        {
          title: "Invoices",
          url: "/dashboard/invoices",
          icon: Receipt,
          permission: "invoices.view",
          isImplemented: true,
        },
        {
          title: "Payments",
          url: "/dashboard/payments",
          icon: CreditCard,
          permission: "payments.view",
          isImplemented: true,
        },
        {
          title: "Expenses",
          url: "/dashboard/expenses",
          icon: HandCoins,
          permission: "expenses.view",
          isImplemented: false,
        },
      ],
    },
    {
      label: "Communication",
      items: [
        {
          title: "Notices",
          url: "/dashboard/notices",
          icon: Megaphone,
          permission: "notices.view",
          isImplemented: false,
        },
      ],
    },
    {
      label: "Reports",
      items: [
        {
          title: "Reports",
          url: "/dashboard/reports",
          icon: BarChart3,
          permission: "reports.view",
          isImplemented: true,
        },
      ],
    },
    {
      label: "Organisation",
      items: [
        {
          title: "Team & Roles",
          url: "/dashboard/team",
          icon: UserCog,
          permission: "team.manage",
          isImplemented: true,
        },
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
          permission: "settings.manage",
          isImplemented: true,
        },
        {
          title: "Subscription & Usage",
          url: "/dashboard/subscription",
          icon: Sparkles,
          permission: "billing.manage",
          badge: "Pro",
          isImplemented: false,
        },
      ],
    },
  ]
}

export const sidebarGroups = buildSidebarGroups()

export const adminSidebarGroups: NavGroup[] = [
  {
    label: "Platform",
    items: [
      {
        title: "Overview",
        url: "/dashboard",
        icon: LayoutDashboard,
        isImplemented: true,
      },
      {
        title: "Organisations",
        url: "/dashboard/organisations",
        icon: Building2,
        isImplemented: true,
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: Users,
        isImplemented: true,
      },
    ],
  },
  {
    label: "Billing",
    items: [
      {
        title: "Plans",
        url: "/dashboard/plans",
        icon: Layers,
        isImplemented: true,
      },
      {
        title: "Subscriptions",
        url: "/dashboard/subscriptions",
        icon: CreditCard,
        isImplemented: true,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        title: "Support Access",
        url: "/dashboard/support",
        icon: LifeBuoy,
        isImplemented: true,
      },
      {
        title: "Audit Logs",
        url: "/dashboard/audit-logs",
        icon: ScrollText,
        isImplemented: true,
      },
      // {
      //   title: "System Health",
      //   url: "/dashboard/health",
      //   icon: Activity,
      //   isImplemented: false,
      // },
    ],
  },
]

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  } | null

  organisation?: {
    name?: string | null
    logoUrl?: string | null
  } | null

  membership?: {
    roleName?: string | null
    permissions?: string[]
  } | null

  terminology?: TerminologyMap

  isPlatformAdmin?: boolean
}

export function AppSidebar({
  user,
  organisation,
  membership,
  terminology,
  isPlatformAdmin: isPlatformAdminProp,
  ...props
}: AppSidebarProps) {
  const isPlatformAdmin =
    isPlatformAdminProp !== undefined
      ? isPlatformAdminProp
      : user?.role === "SUPER_ADMIN" && !organisation?.name

  const activeGroups: NavGroup[] = React.useMemo(() => {
    if (isPlatformAdmin) return adminSidebarGroups

    return buildSidebarGroups(terminology)
      .map((group) => ({
        label: group.label,
        items: group.items
          .filter((item) => can(membership?.permissions, item.permission))
          // strip our own field so NavMain receives a plain NavGroup item
          .map(({ permission: _permission, ...item }) => item),
      }))
      .filter((group) => group.items.length > 0)
  }, [isPlatformAdmin, terminology, membership?.permissions])

  const headerTitle = isPlatformAdmin
    ? "ShikkhaFlow Admin"
    : organisation?.name || "ShikkhaFlow"
  const headerSubtitle = isPlatformAdmin
    ? "Platform Control"
    : membership?.roleName || "Workspace"

  const headerLogo = isPlatformAdmin ? (
    <ShieldAlert className="size-4 text-amber-500" />
  ) : organisation?.logoUrl ? (
    <img
      src={organisation.logoUrl}
      alt={headerTitle}
      className="size-5 rounded object-cover"
    />
  ) : (
    <Building2 className="size-4" />
  )

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-2 py-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            {headerLogo}
          </div>
          <div className="flex flex-col overflow-hidden text-left leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-xs font-semibold">
              {headerTitle}
            </span>
            <span className="truncate text-[10px] text-muted-foreground">
              {headerSubtitle}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={activeGroups} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar
