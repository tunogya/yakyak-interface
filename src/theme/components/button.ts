export const Button = {
  baseStyle: {
    borderRadius: "full",
    fontFamily: "Nunito",
  },
  variants: {
    outline: {
      _hover: "none",
      _active: "none",
      border: "2px",
      height: "48px",
    },
    solid: {
      bg: "veryPeri",
      _hover: "none",
      _active: "none",
      height: "48px",
    },
    ghost: {
      _hover: "none",
      _active: "none",
      border: "2px",
      borderColor: "veryPeri",
      height: "48px",
    },
  },
}
