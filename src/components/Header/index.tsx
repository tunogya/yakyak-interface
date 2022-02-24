import {Button, Heading, Spacer, Stack, Tab, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react"
import {useNavigate, useLocation} from "react-router-dom"
import Web3Status from "../Web3Status"
import {t} from "@lingui/macro"

export const Header = () => {
  const links = [
    {path: "/deposit", label: "Deposit"},
    {path: "/adoption", label: "Adoption"},
    {path: "/account", label: "Account"},
  ]
  const navigate = useNavigate()
  const location = useLocation()

  const handleTabsChange = (index: number) => {
    navigate(`${links[index].path}`)
  }

  return (
    <Stack alignItems={"center"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        h={"96px"}
        w={"full"}
        maxW={"1024px"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={"24px"} w={"200px"}>
          <Heading fontSize={"md"} whiteSpace={"nowrap"}>
            YakYak
          </Heading>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} bg={"white"} borderRadius={"xl"} p={"2px"}>
          <Tabs variant='soft-rounded' isLazy onChange={handleTabsChange}>
            <TabList>
              { links.map((item, index)=>(
                <Tab
                  key={index}
                  style={{ borderRadius: '12px' }}
                >{t`${item.label}`}</Tab>
              )) }
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
