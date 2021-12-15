import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const YAKYAK_REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0xC9F51064022A011152B7dA6dDE44def02b5C157C',
}

export const YAKYAK_BANK_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x9713B119aa127bBDbA8d9AbEb51F3fFAEC8cA76d',
}

