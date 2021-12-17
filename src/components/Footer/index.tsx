import {Stack, Text, Heading, Divider, Spacer, Wrap, WrapItem} from "@chakra-ui/react";
import {} from "react-icons"
import {AiFillGithub, FaTiktok} from "react-icons/all";

const Footer = () => {
  return (
    <Stack w={"full"} h={"300px"} bg={"blue.700"} px={32} py={12} direction={"row"} color={"white"} justifyContent={"space-around"}>
      <Stack spacing={4}>
        <Heading fontStyle={"italic"} fontSize={"xl"}>YakYak©</Heading>
        <Heading fontSize={"md"}>Wakanda Labs</Heading>
        <Spacer/>
        <Stack direction={"row"} alignItems={"center"} spacing={4}>
          <AiFillGithub size={"20px"}/>
          <FaTiktok />
        </Stack>

      </Stack>
      <Divider orientation='vertical'/>
      <Stack w={"300px"}>
        <Wrap>
          <WrapItem w={"120px"}>
            <Text fontWeight={"bold"}>Rewards</Text>
          </WrapItem>
          <WrapItem w={"120px"}>
            <Text fontWeight={"bold"}>Bank</Text>
          </WrapItem>
          <WrapItem w={"120px"}>
            <Text fontWeight={"bold"}>Ranch</Text>
          </WrapItem>
        </Wrap>
        <Spacer />
        <Text color={"gray.500"}>XXXXX</Text>
        <Text color={"gray.500"}>XXXXX</Text>
      </Stack>
      <Stack w={"160px"}>
        <Text color={"gray.500"}>XXXXX</Text>
        <Text color={"gray.500"}>XXXXX</Text>
        <Text color={"gray.500"}>XXXXX</Text>
      </Stack>

    </Stack>
  )
}

export default Footer