import gleam/javascript/promise.{type Promise}
import gleam/option.{type Option}

pub type KVNamespace

@external(javascript, "./kv_ffi.mjs", "kv_get")
pub fn get(namespace: KVNamespace, key: String) -> Promise(Option(String))

@external(javascript, "./kv_ffi.mjs", "kv_put")
pub fn put(namespace: KVNamespace, key: String, value: String) -> Promise(Nil)

@external(javascript, "./kv_ffi.mjs", "kv_delete")
pub fn delete(namespace: KVNamespace, key: String) -> Promise(Nil)

@external(javascript, "./kv_ffi.mjs", "kv_list")
pub fn list(namespace: KVNamespace) -> Promise(List(String))
