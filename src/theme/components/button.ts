export const Button = {
  baseStyle: {
    borderRadius: "full",
    fontFamily: "Noto Sans",
  },
  variants: {
    outline: {
      _hover: {
        bg: "none",
        opacity: 0.8,
      },
      _active: {
        bg: "none",
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
