import {Heading, Stack, Text} from "@chakra-ui/react"
import {useNavigate, useLocation} from "react-router-dom"
import {useState} from "react"
import Web3Status from "../Web3Status"
import NetworkCard from "./NetworkCard"

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
    <Stack w={"full"} alignItems={"center"} bg={"white"}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} py={4} px={[2, 2, 4, 4]} w={"full"}>
        <Stack direction={"row"} alignItems={"center"} spacing={[2, 4, 8, 16]}>
          <Stack id={"logo"}>
            <Heading fontSize={"md"} fontWeight={"bold"} fontStyle={"italic"} whiteSpace={"nowrap"}>
              YakYak® Club
            </Heading>
          </Stack>
          <Stack direction={"row"} spacing={[1, 2, 4, 8]} id={"menu"}>
            {links.map((link, index) => (
              <Text
                key={index}
                size={"md"}
                fontStyle={"italic"}
                fontWeight={"800"}
                color={currentPath === link.path ? "blue.700" : "gray"}
                onClick={() => {
                  navigate(link.path)
                  setCurrentPath(link.path)
                }}
                cursor={"pointer"}
              >
                {link.label}
              </Text>
            ))}
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          {/*<NetworkCard/>*/}
          <Web3Status/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Header
