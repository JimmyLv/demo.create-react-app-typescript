import { CountState } from './count'
import { UsersState } from './users'

export interface AppState {
  count: CountState
  users: UsersState
  loading: {
    models: {
      users: boolean
    }
  }
}