import React from "react"
import {Route, Routes} from "react-router-dom"
import {Stack} from "@chakra-ui/react"
import Header from "../components/Header"
import Deposit from "./Deposit";
import Adoption from "./Adoption";
import Account from "./Account";

function App() {
  return (
    <Stack spacing={0} h={"100vh"} bg={"primary"} color={"white"}>
      <Stack position={"fixed"} w={"full"} zIndex={"docked"}>
        <Header/>
      </Stack>
      <Stack w={"full"}>
        <Content/>
      </Stack>
    </Stack>
  )
}

const Content = () => {
  return (
    <Stack alignItems={"center"} pt={"96px"}>
      <Routes>
        <Route path={'/'} element={<Deposit />}/>
        <Route path={'/deposit'} element={<Deposit />}/>
        <Route path={'/adoption'} element={<Adoption />}/>
        <Route path={'/account'} element={<Account />}/>
        <Route
          path="*"
          element={
            <main style={{padding: "1rem"}}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Stack>
  )
}

export default App
