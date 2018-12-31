import {AnyAction} from 'redux'

export class ActionDispatcher {
  protected dispatch: (action: AnyAction) => any

  constructor(dispatch: (action: AnyAction) => any) {
    this.dispatch = dispatch
  }
}
