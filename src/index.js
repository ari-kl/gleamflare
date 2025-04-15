import { fetch } from "./worker.mjs"
import { JStoGleamRequest, GleamtoJSResponse } from "./http_ffi.mjs"

export default {
  async fetch(request, env, ctx) {
    let resp = fetch(JStoGleamRequest(request), env)

    if (resp instanceof Promise) {
      return resp.then(r => GleamtoJSResponse(r))
    } else {
      return GleamtoJSResponse(resp)
    }
  }
}
