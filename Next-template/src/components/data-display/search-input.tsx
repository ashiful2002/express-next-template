import * as React from "react"
import { AppInput, type AppInputProps } from "@/src/components/common/app-input"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"

export interface SearchInputProps extends Omit<AppInputProps, "startIcon"> {
  onSearch?: (value: string) => void
}

export function SearchInput({
  placeholder = "Search...",
  value,
  onChange,
  onClear,
  clearable = true,
  ...props
}: SearchInputProps) {
  return (
    <AppInput
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      clearable={clearable}
      onClear={onClear}
      startIcon={<HugeiconsIcon icon={Search01Icon} className="size-4" />}
      {...props}
    />
  )
}

