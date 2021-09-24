import React from "react"
import { Route, Switch } from "react-router-dom"

function App() {
  return (
    <>
      <Switch>
        <Route exact strict path="/vote" />
        <Route />
      </Switch>
    </>
  )
}

export default App
