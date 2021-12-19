import {Stack, Text, Heading, Spacer} from "@chakra-ui/react";
import {AiFillGithub, FaTiktok} from "react-icons/all";

const Footer = () => {
  return (
    <Stack w={"full"} h={"300px"} bg={"blue.700"} px={32} py={12} direction={"row"} color={"white"} justifyContent={"space-between"}>
      <Stack spacing={4} w={"300px"}>
        <Heading fontStyle={"italic"} fontSize={"xl"} color={"white"}>YakYak®</Heading>
        <Heading fontSize={"md"} color={"white"}>Wakanda Labs</Heading>
        <Spacer/>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <AiFillGithub size={"20px"}/>
          <FaTiktok />
        </Stack>
      </Stack>

      <Stack w={"200px"}>
        <Text color={"gray.500"}>Ethereum</Text>
        <Text color={"gray.500"}>Rinkeby Testnet</Text>
        <Text color={"gray.500"}>Arbitrum One</Text>
        <Text color={"gray.500"}>Arbitrum Rinkeby</Text>
      </Stack>

    </Stack>
  )
}

export default Footer