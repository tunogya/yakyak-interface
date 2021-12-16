import { Button, Stack } from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react"
import Web3Status from "../Web3Status"
import NetworkCard from "./NetworkCard"

export const Header = () => {
  const links = [
    { path: "/", label: "Rewards" },
    { path: "/bank", label: "Bank" },
    { path: "/ranch", label: "Ranch" },
  ]
  const navigate = useNavigate()
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState(location.pathname)

  return (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} p={4} bg={"gray.50"}>
      <Stack direction={"row"} alignItems={"center"}>
        <Button
          variant={"ghost"}
          fontWeight={"bold"}
          fontSize={"md"}
          fontFamily={"Kaushan Script"}
          onClick={() => {
            navigate("/")
            setCurrentPath("/")
          }}
        >
          YakYak® Club
        </Button>

        <Stack direction={"row"}>
          {links.map((link, index) => (
            <Button
              key={index}
              size={"md"}
              variant={"ghost"}
              fontStyle={"italic"}
              color={currentPath === link.path ? "black" : "gray"}
              onClick={() => {
                navigate(link.path)
                setCurrentPath(link.path)
              }}
            >
              {link.label}
            </Button>
          ))}
        </Stack>
      </Stack>
      <Stack justifySelf={"flex-end"} direction={"row"} alignItems={"center"}>
        <NetworkCard />
        <Web3Status />
      </Stack>
    </Stack>
  )
}

export default Header
