/**
 * ありえない状態になった時のエラー
 */
export class InternalInconsistencyError extends Error {
  constructor(...params: any[]) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InternalInconsistencyError)
    }
  }
}
