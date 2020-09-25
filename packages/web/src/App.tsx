import React from "react";
import { App as CommonAppContainer } from "@rn/common";
import { Test } from "@rn/common/dist/components/Test";

function App() {
  return (
    <CommonAppContainer renderText={<Test text="Hello from @rn/common!" />} />
  );
}

export default App;
