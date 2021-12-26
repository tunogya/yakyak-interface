import {Stack, WrapItem, Wrap, Text, Button, Spacer} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {Invite} from "./Invite";
import {Deposit} from "./Deposit";
import {Cheque} from "./Cheque";
import {Donate} from "./Donate";
import {YakYakMe} from "./YakYakMe";

export const More = () => {
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

  return (
    <Stack w={"full"} maxW={"1024px"} py={"12px"} direction={"row"}>
      <Wrap spacing='30px' justify={"center"}>
        {moreList.map((item) => (
          <WrapItem>
            <Stack w={"280px"} h={"240px"} bg={"white"} borderRadius={"8px"} p={"24px"} alignItems={"center"}
                   textAlign={"center"}
                   justifyContent={"center"}>
              <Text color={"primary"} fontSize={"20px"}>{item.label}</Text>
              <Text fontSize={"14px"}>{item.info}</Text>
              <Spacer/>
              <Button isFullWidth={true} onClick={() => {
                navigate('/transfer/' + item.action)
              }}>{item.button}</Button>
            </Stack>
          </WrapItem>
        ))}
      </Wrap>
    </Stack>
  )
}