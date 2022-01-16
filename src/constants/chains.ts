import arbitrumLogoUrl from "../assets/svg/arbitrum_logo.svg"

export enum SupportedChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,

  LOCALHOST = 31337,

  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,

}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.LOCALHOST,
  
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
]

export const L1_CHAIN_IDS = [
  SupportedChainId.MAINNET,
  SupportedChainId.ROPSTEN,
  SupportedChainId.RINKEBY,
  SupportedChainId.GOERLI,
  SupportedChainId.KOVAN,
  SupportedChainId.LOCALHOST,
] as const

export type SupportedL1ChainId = typeof L1_CHAIN_IDS[number]

export const L2_CHAIN_IDS = [SupportedChainId.ARBITRUM_ONE, SupportedChainId.ARBITRUM_RINKEBY] as const

export type SupportedL2ChainId = typeof L2_CHAIN_IDS[number]

interface L1ChainInfo {
  readonly docs: string
  readonly explorer: string
  readonly infoLink: string
  readonly label: string
}
export interface L2ChainInfo extends L1ChainInfo {
  readonly bridge: string
  readonly logoUrl: string
}

type ChainInfo = { readonly [chainId: number]: L1ChainInfo | L2ChainInfo } & {
  readonly [chainId in SupportedL2ChainId]: L2ChainInfo
} & { readonly [chainId in SupportedL1ChainId]: L1ChainInfo }

export const CHAIN_INFO: ChainInfo = {
  [SupportedChainId.ARBITRUM_ONE]: {
    bridge: "https://bridge.arbitrum.io/",
    docs: "https://offchainlabs.com/",
    explorer: "https://arbiscan.io/",
    infoLink: "",
    label: "Arbitrum",
    logoUrl: arbitrumLogoUrl,
  },
  [SupportedChainId.ARBITRUM_RINKEBY]: {
    bridge: "https://bridge.arbitrum.io/",
    docs: "https://offchainlabs.com/",
    explorer: "https://rinkeby-explorer.arbitrum.io/",
    infoLink: "",
    label: "Arbitrum Rinkeby",
    logoUrl: arbitrumLogoUrl,
  },
  [SupportedChainId.MAINNET]: {
    docs: "https://wakanda-labs.com/",
    explorer: "https://etherscan.io/",
    infoLink: "",
    label: "Mainnet",
  },
  [SupportedChainId.RINKEBY]: {
    docs: "https://wakanda-labs.com/",
    explorer: "https://rinkeby.etherscan.io/",
    infoLink: "",
    label: "Rinkeby",
  },
  [SupportedChainId.ROPSTEN]: {
    docs: "https://wakanda-labs.com/",
    explorer: "https://ropsten.etherscan.io/",
    infoLink: "",
    label: "Ropsten",
  },
  [SupportedChainId.KOVAN]: {
    docs: "https://wakanda-labs.com/",
    explorer: "https://kovan.etherscan.io/",
    infoLink: "",
    label: "Kovan",
  },
  [SupportedChainId.GOERLI]: {
    docs: "https://wakanda-labs.com/",
    explorer: "https://goerli.etherscan.io/",
    infoLink: "",
    label: "Görli",
  },
  [SupportedChainId.LOCALHOST]: {
    docs: "https://localhost/",
    explorer: "",
    infoLink: "",
    label: "Localhost",
  },
}
