import cloudflare/environment.{type Environment}
import cloudflare/kv
import gleam/http/request.{type Request}
import gleam/http/response.{type Response}
import gleam/javascript/promise.{type Promise}
import gleam/option.{None, Some}
import gleam/uri

pub fn fetch(
  req: Request(String),
  env: Environment,
) -> Promise(Response(String)) {
  // Access the KV namespace
  let assert Some(ns) = environment.kv(env, "GLEAM_TEST")
  // Write the request url with the key "testing"
  use _ <- promise.await(kv.put(
    ns,
    "testing",
    req |> request.to_uri |> uri.to_string,
  ))
  // Read the key "testing"
  use val <- promise.await(kv.get(ns, "testing"))

  case val {
    Some(val) -> response.new(200) |> response.set_body(val)
    None -> response.new(404) |> response.set_body("Not found")
  }
  |> promise.resolve
}
