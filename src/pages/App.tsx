import React from "react"
import { Route, Switch } from "react-router-dom"
import { Stack } from "@chakra-ui/react"
import Header from "../components/Header"
import Wallet from "./Wallet"
import Swap from "./Swap"
import Web3ReactManager from "../components/Web3ReactManager"

function App() {
  return (
    <Web3ReactManager>
      <Stack spacing={0} minH={"100vh"}>
        <Stack position={"fixed"} w={"100%"}>
          <Header />
        </Stack>
        <Stack p={"120px 16px 0 16px"} alignItems={"center"}>
          <Switch>
            <Route exact strict path="/swap" component={Swap} />
            <Route exact strict path="/" component={Wallet} />
            <Route />
          </Switch>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
