import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

interface Props {
  error: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    errorBlock: {
      display: "flex",
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

export const ErrorBlock = ({ error }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.errorBlock}>
      <Typography variant="h3">{error}</Typography>
    </div>
  );
};
