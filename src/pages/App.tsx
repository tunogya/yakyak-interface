import React from "react"
import { Route, Routes } from "react-router-dom"
import { Stack } from "@chakra-ui/react"
import Header from "../components/Header"
import Web3ReactManager from "../components/Web3ReactManager"

function App() {
  return (
    <Web3ReactManager>
      <Stack spacing={0} h={"full"}>
        <Stack position={"fixed"} w={"100%"} zIndex={"docked"}>
          <Header />
        </Stack>
        <Stack p={"72px 0 0 0"} alignItems={"center"}>
          <Routes>
            <Route path="/"/>
            <Route />
          </Routes>
        </Stack>
      </Stack>
    </Web3ReactManager>
  )
}

export default App
