import React, { useState } from "react";
import { IonSpinner } from "@ionic/react";
import Store from "../redux/Store";
import { createUseStyles } from "react-jss";

export default function Spinner() {
  const [isLoading, setIsLoading] = useState(
    Store.getState().CheckAccessToken.status
  );

  const classes = useStyles();

  Store.subscribe(async () => {
    setIsLoading(Store.getState().ApiRequestState.isLoading);
  });

  return isLoading ? (
    <div className={classes.spinnerBg}>
      <IonSpinner color="light" name="bubbles"></IonSpinner>
    </div>
  ) : (
    <></>
  );
}
const useStyles = createUseStyles({
  spinnerBg: {
    zIndex: "999",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    opacity: "0.8",
    background: "rgba(0, 0, 0, 0.5)",
    transform: "scale(2)",
  },
});
