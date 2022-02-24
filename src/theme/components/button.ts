export const Button = {
  baseStyle: {
    borderRadius: "8px",
    fontFamily: "Nunito",
  },
  variants: {
    outline: {
      border: "2px",
      height: "44px",
      borderColor: 'primary',
      _hover: {
        bg: 'primary',
        color: 'white'
      },
      _active: null
    },
    solid: {
      bg: "primary",
      color: "white",
      height: "44px",
      _hover: null,
      _active: null
    },
    ghost: {
      height: "44px",
    },
  },
}
