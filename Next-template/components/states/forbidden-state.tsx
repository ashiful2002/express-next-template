import {
  AccessDeniedState,
  type AccessDeniedStateProps,
} from "./access-denied-state"

export type ForbiddenStateProps = AccessDeniedStateProps

export function ForbiddenState(props: ForbiddenStateProps) {
  return <AccessDeniedState {...props} />
}

