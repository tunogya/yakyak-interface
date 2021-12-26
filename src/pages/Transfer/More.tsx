import {Stack, WrapItem, Wrap, Text, Button, Spacer} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {moreList} from "./index";

export const More = () => {
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