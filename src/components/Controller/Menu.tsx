import {Stack, Tab, TabList, Tabs} from "@chakra-ui/react";
import {useState} from "react";
import {t} from "@lingui/macro";
import {useLocation, useNavigate} from "react-router-dom";

export const Menu = () => {
  const links = [
    {pathname: "/deposit", label: t`Deposit`},
    {pathname: "/adoption", label: t`Adoption`},
    {pathname: "/account", label: t`Account`},
  ]

  const navigate = useNavigate()
  const location = useLocation()
  const [tabIndex, setTabIndex] = useState(location.pathname === '/' ? 0 : links.findIndex(({pathname}) => (pathname === location.pathname)))

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
    navigate(`${links[index].pathname}`)
  }
  return (
    <Stack direction={"row"} justifyContent={"center"} bg={"white"} borderRadius={"xl"} p={"2px"}>
      <Tabs variant='soft-rounded' isLazy onChange={handleTabsChange} index={tabIndex}>
        <TabList>
          {links.map((item, index) => (
            <Tab
              key={index}
              style={{borderRadius: '12px'}}
              _selected={{ color: "white", bg: "primary" }}
            >{item.label}</Tab>
          ))}
        </TabList>
      </Tabs>
    </Stack>
  )
}