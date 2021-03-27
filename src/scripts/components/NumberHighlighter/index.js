import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minWidth: "180px",
    padding: "16px",
    justifyContent: "space-between",
    marginBottom: "24px",
  },
  value: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#606060",
  },
});

const NumberHighlighter = ({ value, text }) => {
  const styles = useStyles();
  return (
    <Paper className={styles.root}>
      <div>{text}</div>
      <div className={styles.value}>{value}</div>
    </Paper>
  );
};

export default NumberHighlighter;
