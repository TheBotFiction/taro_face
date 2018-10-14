import { container } from "assets/jss/material-kit-react";
const mainBackground = 'https://res.cloudinary.com/yeuem1vannam/image/upload/v1538759433/backgrounds/channel-background.jpg'

const componentsStyle = (theme) => ({
  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px 0 0"
  },
  main: {
    background: "#FFFFFF",
    backgroundImage: `url(${mainBackground})`,
    backgroundSize: 500,
    minHeight: 420,
    maxWidth: theme.breakpoints.values.lg,
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px auto 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  }
});

export default componentsStyle;
