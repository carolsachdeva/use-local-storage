import React from "react";
import { createRoot } from "react-dom/client";
import Usage from "./Usage";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(<Usage />);
}
