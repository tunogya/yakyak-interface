import {Stack} from "@chakra-ui/react";
import {TabMenuItem} from "../../components/TabMenuItem";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Pay} from "./Pay";
import {More} from "./More";
import {Request} from "./Request";

export const Transfer = () => {
  const tabList = [
    {label: "Pay", action: "pay", path: "/transfer/pay", element: <Pay/>},
    {label: "Get Rewards", action: "request", path: "/transfer/request", element: <Request/>},
    {label: "More", action: "more", path: "/transfer/more", element: <More/>},
  ]
  const navigate = useNavigate()
  const params = useParams()

  return (
    <Stack w={"full"}>
      <Stack h={"60px"} bg={"white"} direction={"row"} justifyContent={"center"} alignItems={"center"}
             borderBottomWidth={"1px"} borderBottomColor={"divider"}>
        {
          tabList.map((tab) => (
            <TabMenuItem key={tab.label} label={tab.label} activated={(params?.action ?? "pay") === tab.action}
                         onClick={() => {
                           navigate(tab.path)
                         }}/>
          ))
        }
      </Stack>
      <Stack alignItems={"center"} px={"12px"} spacing={0}>
        {
          tabList.map((tab) => (
            <Stack key={tab.label} hidden={params.action !== tab.action} w={"full"} maxW={"1024px"}>
              {tab.element}
            </Stack>
          ))
        }
      </Stack>
    </Stack>
  )
}

export default Transfer