import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";

// Theme setup
const darkTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: pink,
    secondary: indigo, // Indigo is probably a good match with pink
    type: "dark"
  }
});

const lightTheme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    type: "light"
  }
});

export default { darkTheme, lightTheme };
