export const Button = {
  baseStyle: {
    borderRadius: "full",
    fontFamily: "Nunito",
  },
  variants: {
    outline: {},
    solid: {
      bg: "blue.500",
      color: "white",
      _active: {
        bg: "blue.600",
      },
      _hover: {
        bg: "blue.400",
      },
      _disabled: {
        bg: "blue.600",
      },
    },
    ghost: {},
  },
}
