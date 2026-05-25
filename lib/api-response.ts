import { PaginatedResponse } from './types'

interface BackendEnvelope<T> {
  data?: T
}

export function unwrapApiData<T>(payload: T | BackendEnvelope<T> | undefined): T | undefined {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as BackendEnvelope<T>).data
  }

  return payload as T | undefined
}

export function unwrapApiList<T>(
  payload: T[] | PaginatedResponse<T> | BackendEnvelope<T[] | PaginatedResponse<T>> | undefined,
): T[] {
  const data = unwrapApiData<T[] | PaginatedResponse<T>>(payload)

  if (Array.isArray(data)) {
    return data
  }

  if (data && Array.isArray((data as PaginatedResponse<T>).data)) {
    return (data as PaginatedResponse<T>).data
  }

  return []
}
