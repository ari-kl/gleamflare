import cloudflare/kv.{type KVNamespace}
import gleam/option.{type Option}

pub type Environment

@external(javascript, "./kv_ffi.mjs", "kv_new")
pub fn kv(env: Environment, name: String) -> Option(KVNamespace)
