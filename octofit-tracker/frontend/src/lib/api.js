const LOCAL_API_BASE = 'http://localhost:8000/api'

function firstArrayValue(value) {
  if (!value || typeof value !== 'object') {
    return []
  }

  for (const candidate of Object.values(value)) {
    if (Array.isArray(candidate)) {
      return candidate
    }
  }

  return []
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.rankings)) return payload.rankings
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.data)) return payload.data

  return firstArrayValue(payload)
}

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return LOCAL_API_BASE
}

export async function requestCollection(resource) {
  const response = await fetch(`${getApiBaseUrl()}/${resource}/`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource}: ${response.status}`)
  }

  const json = await response.json()
  return normalizeCollectionResponse(json)
}
