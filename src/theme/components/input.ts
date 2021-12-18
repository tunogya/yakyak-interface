export const Input = {
  baseStyle: {
    fontFamily: "Nunito",
  },
  variants: {
    filled: {
      field:{
        borderRadius: "20px",
        bg: "blue.300",
        _hover: {
          borderColor: "blue.500",
          bg: "blue.300",
        },
        _focus: {
          bg: "blue.500",
        }
      }
    }
  },
}
