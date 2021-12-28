import {Button, Input, Stack, Text} from "@chakra-ui/react"
import {useYakYakMe} from "../../hooks/useYakYakMe";
import {useState} from "react";

export const YakYakMe = () => {
  const {take, update, takeStatus, updateStatus} = useYakYakMe()
  const [name, setName] = useState("")

  const createForm = () => {
    return (
      <Stack w={"full"} bg={"white"} p={"96px"} spacing={"32px"} borderRadius={"8px"}>
        <Text fontSize={"20px"}>Set your profile</Text>
        <Input onChange={(e)=> setName(e.target.value)}/>
        <Stack direction={"row"}>
          <Button variant={"outline"} disabled={name === ''}
                  onClick={async () => {
                    await take(name)
                  }}>
            Next
          </Button>
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack w={"full"} maxW={"600px"} py={"12px"} alignItems={"center"}>
      {createForm()}
    </Stack>
  )
}