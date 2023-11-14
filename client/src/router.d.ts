import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
  }
}

export function push(arg0: string) {
throw new Error('Function not implemented.')
}
