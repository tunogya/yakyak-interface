/// <reference types="react-scripts" />
declare module "*.ttf"
declare module "*.svg"
declare module "*.png"
declare module "*.jpg"

interface Window {
  ethereum?: {
    isMetaMask?: true
    isConnected: () => boolean
    request: <T extends unknown>(args: RequestArguments) => Promise<T>
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean

    _metamask: {
      isUnlocked: () => Promise<boolean>
    }
  }
  web3?: Record<string, unknown>
}

declare module "content-hash" {
  declare function decode(x: string): string
  declare function getCodec(x: string): string
}

declare module "multihashes" {
  declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array }
  declare function toB58String(hash: Uint8Array): string
}
