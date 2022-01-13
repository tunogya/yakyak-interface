import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "../abis/erc20.json"
import ERC20_BYTES32_ABI from "../abis/erc20_bytes32.json"
import YakYakBank_ABI from "../abis/yakyak-bank.json"
import YakYakRewards_ABI from "../abis/yakyak-rewards.json"
import YakYakClone_ABI from "../abis/yakyak-clone.json"

import { useMemo } from "react"
import { getContract } from "../utils"
import { Erc20, YakyakBank, YakyakRewards, YakyakClone } from "../abis/types"
import { useActiveWeb3React } from "./web3"
import {YAKYAK_BANK_ADDRESS, YAKYAK_CLONE_ADDRESS, YAKYAK_REWARDS_ADDRESS} from "../constants/addresses";

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useYakYakRewardContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<YakyakRewards>(YAKYAK_REWARDS_ADDRESS[chainId ?? 1], YakYakRewards_ABI, true)
}

export function useYakYakBankContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<YakyakBank>(YAKYAK_BANK_ADDRESS[chainId ?? 1], YakYakBank_ABI, true)
}

export function useYakYakCloneContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<YakyakClone>(YAKYAK_CLONE_ADDRESS[chainId ?? 1] , YakYakClone_ABI, true)
}
