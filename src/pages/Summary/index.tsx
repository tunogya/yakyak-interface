import {Stack, Text} from "@chakra-ui/react";
import {useActiveWeb3React} from "../../hooks/web3";
import {shortenAddress} from "../../utils";
import {MenuButtonWithIcon} from "../../components/MenuButtonWithIcon";
import {ArrowDownIcon, ArrowUpIcon, HamburgerIcon} from "@chakra-ui/icons";

export const Summary = () => {
  const {account} = useActiveWeb3React()

  return (
    <Stack direction={"row"} spacing={0} w={"full"} maxW={"1024px"}>
      <Stack flex={"0 0 60%"} maxW={"60%"} px={"12px"}>
        <Stack my={"36px"} fontSize={"30px"}>
          {
            account ? (
              <Text>Hello, {shortenAddress(account ?? 'NaN')}</Text>
            ) : (
              <Text>Login in</Text>
            )
          }
        </Stack>
      </Stack>
      <Stack flex={"0 0 40%"} maxW={"40%"} px={"12px"}>
        <Stack direction={"row"} my={"36px"} justifyContent={"space-between"}>
          <MenuButtonWithIcon icon={<ArrowUpIcon/>} label={"Send"} variant={"solid"}/>
          <MenuButtonWithIcon icon={<ArrowDownIcon/>} label={"Request"} variant={"solid"}/>
          <MenuButtonWithIcon icon={<HamburgerIcon/>} label={"More"} variant={"outline"} inverse={true}/>
        </Stack>
        <Stack pb={"48px"}>
          <Text fontSize={"16px"} fontWeight={"bold"}>Send again</Text>
        </Stack>
        <Stack pb={"48px"}>
          <Text fontSize={"16px"} fontWeight={"bold"}>Recent activity</Text>
        </Stack>
        <Stack pb={"48px"}>
          <Text fontSize={"16px"} fontWeight={"bold"}>Make an impact</Text>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Summary