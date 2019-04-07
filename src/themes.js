import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import pink from "@material-ui/core/colors/pink";

// Theme setup
const theme = createMuiTheme({
  typography: { useNextVariants: true },
  palette: {
    primary: pink,
    secondary: indigo // Indigo is probably a good match with pink
  }
});

export default theme;
