import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const YAKYAK_REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x8678a05fC4d51a47BEBFDb5446171037de605f25",
  [SupportedChainId.LOCALHOST]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
}

export const YAKYAK_BANK_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x3705b5eA8AB6cf63dC25e5DFE5AF37E71Bf8d9B5",
  [SupportedChainId.LOCALHOST]: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
}

export const YAKYAK_CLONE_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0xb99B89b56FFaF1b71c646bC16D50705Eb1a40223",
  [SupportedChainId.LOCALHOST]: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
}
