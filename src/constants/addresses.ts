import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const YAKYAK_REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x8678a05fC4d51a47BEBFDb5446171037de605f25",
  [SupportedChainId.GANACHE]: "0x424833e9D6ce14651aBf2B4C0f2fc0837301CaCb",
}

export const YAKYAK_BANK_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x3705b5eA8AB6cf63dC25e5DFE5AF37E71Bf8d9B5",
  [SupportedChainId.GANACHE]: "0x7EA28C005bA5a06E0dcCc4863740632bd0ce8095",
}

export const YAKYAK_CLONE_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0xC603802a2625d86b08f1171F209a4FF05BbCe05B",
  [SupportedChainId.GANACHE]: "0x9ebFeBf014Fc4fC254906EcB6ee43f47907D9704",
}
