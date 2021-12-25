import {IconButton, Stack, Text} from "@chakra-ui/react";
import {FC, ReactElement} from "react";

type MenuButtonWithIconProps = {
  icon: ReactElement
  label: string
  variant: "link" | "outline" | string | "ghost" | "solid" | undefined
  inverse?: boolean
}

export const MenuButtonWithIcon: FC<MenuButtonWithIconProps> = ({...props}) => {
  return (
    <Stack w={"72px"} alignItems={"center"}>
      <IconButton w={"48px"} aria-label={"Send"} icon={props.icon} variant={props.variant} color={props.inverse ? "black" : "white"}/>
      <Text fontSize={"13px"} fontWeight={"bold"}>{props.label}</Text>
    </Stack>
  )
}

