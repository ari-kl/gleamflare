import { parse_method, scheme_from_string } from "../gleam_http/gleam/http.mjs";
import { Request } from "../gleam_http/gleam/http/request.mjs";
import { Some, None } from "../gleam_stdlib/gleam/option.mjs";
import { List } from "../prelude.mjs"

export function JStoGleamRequest(jsRequest) {
  let method = parse_method(jsRequest.method);
  let jsHeaders = []

  jsRequest.headers.forEach((k, v) => {
    jsHeaders.push([v, k])
  })

  let headers = List.fromArray(jsHeaders)
  let body = (jsRequest.body === null) ? "" : new TextDecoder().decode(jsRequest.body.getReader().read())

  let schemeStr = jsRequest.url.split(":")[0]
  let scheme = scheme_from_string(schemeStr)

  let fullHost = jsRequest.url.split("/")[2]
  let host = fullHost.split(":")[0]
  let port = fullHost.split(":")[1]
  port = (port === "") ? None : new Some(parseInt(port))

  let path = jsRequest.url.split("/")[3]
  let query = jsRequest.url.split("?")[1]
  query = query === undefined ? new None() : new Some(query)

  return {
    method,
    headers,
    body,
    scheme,
    host,
    port,
    path,
    query
  }
}

export function GleamtoJSResponse(gResponse) {
  let headers = new Headers()

  gResponse.headers.toArray().forEach(([k, v]) => {
    headers.append(k, v)
  })

  return new Response(gResponse.body, {
    status: gResponse.status,
    headers: headers
  })
}
