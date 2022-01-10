import {Button, Heading, Spacer, Stack} from "@chakra-ui/react"
import {useNavigate, useLocation} from "react-router-dom"
import Web3Status from "../Web3Status"

export const Header = () => {
  const links = [
    {path: "/summary", label: "Dashboard"},
    {path: "/transfer", label: "Get & Pay Rewards"},
    {path: "/shopping", label: "Deals"},
    {path: "/transactions", label: "Activity"}
  ]
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Stack alignItems={"center"} bg={"primary"} color={"white"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        h={"96px"}
        w={"full"}
        maxW={"1024px"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"24px"}>
          <Heading fontSize={"md"} fontWeight={"bold"} fontStyle={"italic"} whiteSpace={"nowrap"}>
            YakYak Club
          </Heading>
          <Stack direction={"row"} id={"menu"}>
            {links.map((link, index) => (
              <Button
                key={index}
                color={"white"}
                border={"2px"}
                borderColor={location.pathname === '/' ? (link.path === "/summary" ? "white" : "primary") : (location.pathname.includes(link.path) ? "white" : "primary")}
                fontWeight={"bold"}
                _hover={{borderColor: "white"}}
                onClick={() => {
                  navigate(link.path)
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
          <Web3Status/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Header
