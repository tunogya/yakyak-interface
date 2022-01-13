import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const YAKYAK_REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x8678a05fC4d51a47BEBFDb5446171037de605f25",
}

export const YAKYAK_BANK_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x3705b5eA8AB6cf63dC25e5DFE5AF37E71Bf8d9B5",
}

export const YAKYAK_CLONE_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0xA06475353d880Bb27c861DFf3E9D3d6C5864424b",
}
