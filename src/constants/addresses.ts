import { SupportedChainId } from "./chains"

type AddressMap = { [chainId: number]: string }

export const YAKYAK_REWARDS_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0xC9F51064022A011152B7dA6dDE44def02b5C157C",
}

export const YAKYAK_BANK_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0xBedf7Ecd022be10b4e13B7AFD29CD5fEdEc474ab",
}

export const YAKYAK_ME_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: "0x756276F1a5c2DD4ba49c54CcC7729fE0D9d10968",
}
