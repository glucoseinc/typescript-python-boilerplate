/**
 * サーバAPIが返してきたエラー
 */
export class APIError extends Error {
  constructor(...params: any[]) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError)
    }
  }
}
