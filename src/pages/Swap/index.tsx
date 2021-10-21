import {HStack, Input, VStack, Text, Button} from "@chakra-ui/react";
import {useState} from "react";

export const Swap = () => {
  const [curVal, setCurVal] = useState(0)
  const [testVal, setTestVal] = useState(0)
  const [a, setA] = useState("")
  const [b, setB] = useState("")
  console.log(a, b)
  return (
    <VStack alignItems={"flex-start"} w="400px" spacing={8}>
      <Text>当前合约值:{curVal}。</Text>
      <VStack w={"100%"}>
        <HStack w="100%">
          <Text>A:</Text>
          <Input type="number" onChange={e => setA(e.target.value)}/>
        </HStack>
        <HStack w="100%">
          <Text>B:</Text>
          <Input type="number" onChange={e => setB(e.target.value)}/>
        </HStack>
      </VStack>
      <HStack w={"100%"}>
        <Button isFullWidth variant={"outline"}>预计结果</Button>
        <Button isFullWidth>提交区块</Button>
      </HStack>
      <Text>预计合约值增加 {testVal}</Text>
    </VStack>
  )
}

export default Swap
