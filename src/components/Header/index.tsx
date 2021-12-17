import { Heading, Stack, Text} from "@chakra-ui/react"
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
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={4} w={"1440px"}>
        <Stack direction={"row"} alignItems={"center"} spacing={16}>
          <Stack id={"logo"}>
            <Heading cursor={"pointer"} fontSize={"md"} onClick={() => {
              navigate("/")
              setCurrentPath("/")
            }} fontWeight={"bold"} fontStyle={"italic"}>
              YakYak® Club
            </Heading>
          </Stack>
          <Stack direction={"row"} spacing={8} id={"menu"}>
            {links.map((link, index) => (
              <Text
                key={index}
                size={"md"}
                fontStyle={"italic"}
                fontWeight={"800"}
                color={currentPath === link.path ? "black" : "gray"}
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
          <NetworkCard/>
          <Web3Status/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Header
