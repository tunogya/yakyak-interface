import {Input, Spacer, Stack, Text} from "@chakra-ui/react";
import {useYakYakRewards} from "../../hooks/useYakYakRewards";
import {useActiveWeb3React} from "../../hooks/web3";
import {useCallback, useEffect, useState} from "react";
import {formatNumber} from "../../utils/bignumberUtil";

export const Shopping = () => {
  const { account } = useActiveWeb3React()
  const { balanceOf } = useYakYakRewards()
  const [balance, setBalance] = useState('NaN')

  const refresh = useCallback(async () => {
    if (account) {
      setBalance(formatNumber(await balanceOf(account)))
    }
  }, [account, balanceOf])

  useEffect(()=>{
    refresh()
  }, [refresh])

  return (
    <Stack w={"full"}>
      <Stack h={"60px"} bg={"white"} alignItems={"center"} justifyContent={"center"}
             borderBottomWidth={"1px"} borderBottomColor={"divider"}>
        <Stack w={"full"} maxW={"1024px"} direction={"row"} alignItems={"center"} spacing={"60px"}>
          <Text fontSize={"14px"} fontWeight={"bold"}>Shop</Text>
          <Text fontSize={"14px"} fontWeight={"bold"}>Categories</Text>
          <Text fontSize={"14px"} fontWeight={"bold"}>{balance} YakYak® Rewards </Text>
          <Spacer />
          <Input w={"200px"} variant={"filled"}/>
        </Stack>
      </Stack>

    </Stack>
  )
}

export default Shopping