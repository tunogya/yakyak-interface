import { Contract } from "@ethersproject/contracts"
import ERC20_ABI from "../abis/erc20.json"
import ERC20_BYTES32_ABI from "../abis/erc20_bytes32.json"
import EIP_2612 from "../abis/eip_2612.json"
import YakYakBank_ABI from "../abis/yakyak-bank.json"
import YakYakRewards_ABI from "../abis/yakyak-rewards.json"
import YakYakMe_ABI from "../abis/yakyak-me.json"

import { useMemo } from "react"
import { getContract } from "../utils"
import { Erc20, YakyakBank, YakyakRewards, YakyakMe } from "../abis/types"
import { useActiveWeb3React } from "./web3"

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

export function useEIP2612Contract(tokenAddress?: string): Contract | null {
  return useContract(tokenAddress, EIP_2612, false)
}

export function useYakYakRewardContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<YakyakRewards>(tokenAddress, YakYakRewards_ABI, withSignerIfPossible)
}

export function useYakYakBankContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<YakyakBank>(address, YakYakBank_ABI, withSignerIfPossible)
}

export function useYakYakMeContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<YakyakMe>(address, YakYakMe_ABI, withSignerIfPossible)
}
