export const Button = {
  baseStyle: {
    borderRadius: "full",
    fontFamily: "Nunito",
  },
  variants: {
    outline: {
      _hover: {
        bg: "white",
        opacity: 0.8,
      },
      _active: {
        bg: "white",
        opacity: 0.5,
      },
    },
    solid: {},
    ghost: {
      _hover: {
        bg: "none",
        opacity: 0.8,
      },
      _active: {
        bg: "none",
        opacity: 0.5,
      },
    },
  },
}
