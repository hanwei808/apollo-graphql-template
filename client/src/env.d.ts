/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASEURL: string
  // 更多环境变量...
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module "element-plus/dist/locale/zh-cn.mjs";
declare module 'nprogress';