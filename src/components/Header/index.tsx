import {Heading, Stack, Tab, TabList, Tabs} from "@chakra-ui/react"
import {useNavigate, useLocation} from "react-router-dom"
import Web3Status from "../Web3Status"
import {t} from "@lingui/macro"
import {useState} from "react"

export const Header = () => {
  const links = [
    {pathname: "/deposit", label: t`Deposit`},
    {pathname: "/adoption", label: t`Adoption`},
    {pathname: "/account", label: t`Account`},
  ]

  const navigate = useNavigate()
  const location = useLocation()
  const [tabIndex, setTabIndex] = useState(links.findIndex(({pathname}) => (pathname === location.pathname)))

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
    navigate(`${links[index].pathname}`)
  }

  return (
    <Stack alignItems={"center"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        h={"80px"}
        w={"full"}
        p={"0 18px"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"24px"} w={"200px"}>
          <Heading fontSize={"md"} whiteSpace={"nowrap"}>
            YakYak
          </Heading>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} bg={"white"} borderRadius={"xl"} p={"2px"}>
          <Tabs variant='soft-rounded' isLazy onChange={handleTabsChange} index={tabIndex}>
            <TabList>
              {links.map((item, index) => (
                <Tab
                  key={index}
                  style={{borderRadius: '12px'}}
                >{item.label}</Tab>
              ))}
            </TabList>
          </Tabs>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} w={"200px"} justifyContent={"flex-end"}>
          <Web3Status/>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Header
