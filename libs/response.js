function buildResponse (statusCode, data) {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(data)
  }
}

export function success (data) {
  return buildResponse(200, data)
}

export function fail (data) {
  return buildResponse(500, data)
}

export function badRequest (data) {
  return buildResponse(400, data)
}

export function notFound (data) {
  return buildResponse(404, data)
}
