import {Stack} from "@chakra-ui/react";
import {TabMenuItem} from "../../components/TabMenuItem";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Pay} from "./Pay";
import {More} from "./More";
import {Request} from "./Request";
import {Invite} from "./Invite";
import {Deposit} from "./Deposit";
import {Cheque} from "./Cheque";
import {Donate} from "./Donate";
import {YakYakMe} from "./YakYakMe";

export const Transfer = () => {
  const tabList = [
    {label: "Pay", action: "pay", element: <Pay/>},
    {label: "Get Rewards", action: "request", element: <Request/>},
    {label: "More", action: "more", element: <More/>},
  ]

  const moreList = [
    {
      label: 'Invite your friends',
      info: "Invite a friend and you can both get 10 YakYak®",
      button: "Get Started",
      action: 'invite',
      element: <Invite/>
    },
    {
      label: 'Send to bank account',
      info: "You can send Rewards to YakYak® Bank",
      button: "Send Rewards",
      action: 'deposit',
      element: <Deposit/>
    },
    {
      label: 'Create a cheque',
      info: "Create a cheque by Bank and send it to anyone",
      button: "Create Cheque",
      action: 'cheque',
      element: <Cheque/>
    },
    {
      label: 'Send and receive donations',
      info: "Find support and help others now",
      button: "Get Started",
      action: 'donate',
      element: <Donate/>
    },
    {
      label: 'Create your YakYak.Me profile',
      info: 'Help your friends and customers know it\'s you they are paying.',
      button: 'Create Your Profile',
      action: 'yakyakme',
      element: <YakYakMe/>
    }
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
                           navigate('/transfer/' + tab.action)
                         }}/>
          ))
        }
      </Stack>
      {
        tabList.map((tab) => (
          <Stack key={tab.label} hidden={(params?.action ?? "pay") !== tab.action} w={"full"} alignItems={"center"}>
            {tab.element}
          </Stack>
        ))
      }
      {
        moreList.map((item)=>(
          <Stack key={item.label} hidden={params.action !== item.action} w={"full"} alignItems={"center"}>
            { item.element }
          </Stack>
        ))
      }
    </Stack>
  )
}

export default Transfer