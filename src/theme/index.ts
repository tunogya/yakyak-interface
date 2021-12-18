import { extendTheme } from "@chakra-ui/react"
import { styles } from "./styles"
import { config } from "./config"
import { borders } from "./foundations/borders"
import { Button } from "./components/button"
import { Text } from "./components/text"
import { Heading } from "./components/heading"
import { colors } from "./foundations/colors"
import {Input} from "./components/input"
import {NumberInput} from "./components/numberInput"

const theme = extendTheme({
  config,
  styles,
  borders,
  colors,
  components: {
    Button,
    Text,
    Heading,
    Input,
    NumberInput,
  },
})

export default theme
