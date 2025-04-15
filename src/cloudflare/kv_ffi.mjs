import { Some, None } from "../../gleam_stdlib/gleam/option.mjs"
import { List } from "../../prelude.mjs"

export function kv_new(env, name) {
  if (!env[name] || env[name].constructor.name !== 'KvNamespace') {
    return new None()
  }

  return new Some(env[name])
}

// https://developers.cloudflare.com/kv/api/read-key-value-pairs/
export async function kv_get(namespace, key) {
  return new Promise((resolve, reject) => {
    namespace.get(key).then((value) => {
      if (value === null) {
        resolve(new None())
      } else {
        resolve(new Some(value))
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

// https://developers.cloudflare.com/kv/api/write-key-value-pairs/
export async function kv_put(namespace, key, value) {
  return new Promise((resolve, reject) => {
    namespace.put(key, value).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

// https://developers.cloudflare.com/kv/api/delete-key-value-pairs/
export async function kv_delete(namespace, key) {
  return new Promise((resolve, reject) => {
    namespace.delete(key).then(() => {
      resolve()
    }).catch((error) => {
      reject(error)
    })
  })
}

// https://developers.cloudflare.com/kv/api/list-keys/
export async function kv_list(namespace) {
  return new Promise((resolve, reject) => {
    namespace.list().then(({ keys }) => {
      resolve(List.fromArray(keys.map((key) => key.name)))
    }).catch((error) => {
      reject(error)
    })
  })
}
