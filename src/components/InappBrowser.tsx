import React from "react";

import { InAppBrowser } from "@ionic-native/in-app-browser";

export default function InappBrowser(url: string) {
  var options = "zoom=no,footer=no,location=yes";
  return InAppBrowser.create(url, "_blank", options);
}
