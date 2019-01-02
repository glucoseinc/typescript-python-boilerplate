import {Dispatch} from 'redux'

export class ActionDispatcher {
  protected dispatch: Dispatch

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch
  }
}
