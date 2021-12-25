import {Stack, Text} from "@chakra-ui/react";
import {FC} from "react";

type TabMenuItemProps = {
  label: string
  activated?: boolean
  onClick: () => void
}

export const TabMenuItem: FC<TabMenuItemProps> = ({...props}) => {
  return (
    <Stack h={"full"} justifyContent={"center"} borderBottom={"2px"}
           onClick={props.onClick} cursor={"pointer"}
           borderBottomColor={props.activated ? "primary" : "white"}>
      <Text w={"120px"} textAlign={"center"} fontSize={"14px"} color={props.activated ? "primary" : "black"}
            fontWeight={props.activated ? "bold": "normal"}>{props.label}</Text>
    </Stack>
  )
}