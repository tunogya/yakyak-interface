import {Button, Input, Stack, Text} from "@chakra-ui/react"
import {useYakYakMe} from "../../hooks/useYakYakMe";
import {useCallback, useEffect, useState} from "react";
import {useActiveWeb3React} from "../../hooks/web3";
import {ERROR, IDLE, PROCESSING, SUCCESS} from "../../constants/misc";
import {useGA4React} from "ga-4-react";

export const YakYakMe = () => {
  const { account } = useActiveWeb3React()
  const {take, takeStatus, addressToName} = useYakYakMe()
  const [newName, setNewName] = useState("")
  const [name, setName] = useState("")
  const ga4 = useGA4React()

  const refresh = useCallback(async () => {
    if (!account) return
    setName(await addressToName(account))
  }, [account, addressToName])

  useEffect(()=>{
    refresh()
  }, [refresh])

  const createForm = () => {
    return (
      <Stack w={"full"} bg={"white"} p={"96px"} borderRadius={"8px"}>
        {
          (name === '') ? (
            <Stack spacing={"32px"}>
              <Text fontSize={"20px"}>Set your profile</Text>
              <Input onChange={(e)=> setNewName(e.target.value)}/>
              <Stack direction={"row"}>
                <Button variant={"outline"} disabled={newName === ''} isLoading={takeStatus === PROCESSING}
                        onClick={async () => {
                          if (ga4) {
                            ga4.event("me", "take", newName)
                          }
                          await take(newName)
                        }}>
                  { takeStatus === IDLE && ("Next")}
                  { takeStatus === SUCCESS && ("Success")}
                  { takeStatus === ERROR && ("Error")}
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={"32px"}>
              <Text fontSize={"20px"}>YakYakMe profile</Text>
              <Text>@{name}</Text>
            </Stack>
          )
        }
      </Stack>
    )
  }

  return (
    <Stack w={"full"} maxW={"600px"} py={"12px"} alignItems={"center"}>
      {createForm()}
    </Stack>
  )
}