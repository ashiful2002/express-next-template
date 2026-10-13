import {
  NoResultsState,
  type NoResultsStateProps,
} from "./no-results-state"

export type AppEmptySearchProps = NoResultsStateProps

export function AppEmptySearch(props: AppEmptySearchProps) {
  return <NoResultsState {...props} />
}

