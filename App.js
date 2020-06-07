import React from 'react';

import DrawerNavigator from "./routes/drawer.js";
import { ProgressContextProvider } from "./data/progress.js";

export default function App() {
  return(
    <ProgressContextProvider>
      <DrawerNavigator/>
    </ProgressContextProvider>
  );
}
