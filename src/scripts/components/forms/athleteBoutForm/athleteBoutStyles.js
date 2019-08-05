export default theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    padding: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: "100%"
  },
  button: {
    margin: theme.spacing(1),
    width: "100%"
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    width: "100%",
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  }
});
