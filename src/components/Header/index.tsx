import {Button, Heading, Spacer, Stack} from "@chakra-ui/react"
import {useNavigate, useLocation} from "react-router-dom"
import {useState} from "react"
import Web3Status from "../Web3Status"
import NetworkCard from "./NetworkCard";

export const Header = () => {
  const links = [
    {path: "/", label: "Rewards"},
    {path: "/bank", label: "Bank"},
    {path: "/ranch", label: "Ranch"},
  ]
  const navigate = useNavigate()
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState(location.pathname)

  return (
    <Stack alignItems={"center"} bg={"veryPeri"} color={"white"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        h={"96px"}
        w={"full"}
        maxW={"1024px"}
        px={"96px"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"24px"}>
          <Heading fontSize={"md"} fontWeight={"bold"} fontStyle={"italic"} whiteSpace={"nowrap"}>
            YakYak® Club
          </Heading>
          <Stack direction={"row"} id={"menu"}>
            {links.map((link, index) => (
              <Button
                key={index}
                fontStyle={"italic"}
                variant={currentPath === link.path ? "outline" : "ghost"}
                fontWeight={"800"}
                color={currentPath === link.path ? "white" : "gray.300"}
                onClick={() => {
                  navigate(link.path)
                  setCurrentPath(link.path)
                }}
                cursor={"pointer"}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        </Stack>
        <Spacer/>
        <Stack direction={"row"} alignItems={"center"}>
          <NetworkCard/>
          <Web3Status/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Header
