import {Button, Grid, IconButton, Stack, Text} from '@chakra-ui/react'
import {useHistory} from "react-router-dom";
import {useState} from "react";
import {HamburgerIcon} from "@chakra-ui/icons";

export const Header = () => {
  const links = [
    {path: "/wallet", label: "Wallet"},
    {path: "/swap", label: "Swap"},
  ]
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)

  return (
    <Grid templateColumns="repeat(3, 1fr)" p={4} gap={6} alignItems={"center"}>
      <Stack justifySelf={"flex-start"}>
        <Text>Create React Dapp</Text>
      </Stack>
      <Stack justifySelf={"center"} direction={"row"} background={"white"} p={1} borderRadius={"md"}>
        {links.map((link, index) => (
          <Button key={index} colorScheme={"gray"} size={"md"} variant={currentPath === link.path ? "solid" : "ghost"}
                  onClick={() => {
                    history.push(link.path)
                    setCurrentPath(link.path)
                  }}>{link.label}</Button>
        ))}
      </Stack>
      <Stack justifySelf={"flex-end"} direction={"row"} alignItems={"center"}>
        <Button size={"md"} background={"white"}>Address</Button>
        <IconButton
          background={"white"}
          aria-label="Search database"
          icon={<HamburgerIcon />}
        />
      </Stack>
    </Grid>
  )
}

export default Header
