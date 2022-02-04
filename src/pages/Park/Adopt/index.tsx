import {Text} from "@chakra-ui/react";
import {Controller} from "../Controller";

export const Adopt = () => {
  const getTool = () => {
    return (
      <>
        <Text>Adopt tool</Text>
      </>
    )
  }

  return (
    <>
      <Controller tool={getTool()} />
      <Text>Adopt</Text>
    </>
  )
}

export default Adopt