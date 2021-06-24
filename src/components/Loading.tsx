import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(() =>
  createStyles({
    loading: {
      display: "flex",
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

export const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <CircularProgress size={100} />
    </div>
  );
};
