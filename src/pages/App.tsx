import React from "react"
import {Route, Routes} from "react-router-dom"
import {Stack} from "@chakra-ui/react"
import Controller from "../components/Controller"
import Deposit from "./Deposit";
import Adoption from "./Adoption";
import Account from "./Account";

function App() {
  return (
    <Controller content={<Content/>}/>
  )
}

const Content = () => {
  return (
    <Stack alignItems={"center"}>
      <Routes>
        <Route path={'/'} element={<Deposit/>}/>
        <Route path={'/deposit'} element={<Deposit/>}/>
        <Route path={'/adoption'} element={<Adoption/>}/>
        <Route path={'/account'} element={<Account/>}/>
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
