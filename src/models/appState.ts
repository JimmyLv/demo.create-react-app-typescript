import { CountState } from './count'
import { UsersState } from './users'

export declare interface AppState {
  count: CountState
  users: UsersState
  loading: {
    models: {
      users: boolean
    }
  }
}