import {Heading, Stack} from "@chakra-ui/react"
import Web3Status from "../Web3Status"
import {Menu} from "./Menu";
import {FC, ReactElement} from "react";
import styled from "styled-components";

type ControllerProps = {
  content: ReactElement
}

const TopperMenu = styled.div`
  display: none;
  @media (min-width: 420px) {
    display: block;
  }
`

const BottomMenu = styled.div`
  display: none;
  @media (max-width: 420px) {
    display: block;
  }
`

export const Controller: FC<ControllerProps> = ({...props}) => {
  return (
    <Stack alignItems={"center"} h={"100vh"} bg={"primary"} color={"white"} p={"18px"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"full"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"24px"} w={"200px"}>
          <Heading fontSize={"md"} whiteSpace={"nowrap"}>
            YakYak
          </Heading>
        </Stack>
        <TopperMenu>
          <Menu/>
        </TopperMenu>
        <Stack direction={"row"} alignItems={"center"} w={"200px"} justifyContent={"flex-end"}>
          <Web3Status/>
        </Stack>
      </Stack>
      <Stack h={"full"}>
        {props.content}
      </Stack>
      <BottomMenu>
        <Menu/>
      </BottomMenu>
    </Stack>
  )
}

export default Controller
