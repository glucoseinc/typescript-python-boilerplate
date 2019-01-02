import axios from 'axios'

import {APIError} from './errors'
import {User} from './types'

interface APIResponse<T> {
  succeeded: boolean
  payload?: T
  // エラーはi18tを考えるとコードで管理すべきだけど面倒なのでstringで。
  error?: string
}

const publicApi = axios.create({
  baseURL: '/api',
})

export async function login(nickname: string): Promise<User> {
  const rv = await publicApi.post<APIResponse<User>>('/login', {nickname})
  const response = rv.data

  if (!response.succeeded) {
    throw new APIError(response.error)
  }
  return response.payload
}
