import React from "react";
import { StyleSheet, Text, View } from "react-native";

export function App(props: { renderText?: JSX.Element }) {
  const textComponentToRender = props.renderText || (
    <Text style={styles.text}>Hello, world!</Text>
  );

  return <View style={styles.box}>{textComponentToRender}</View>;
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: "bold" },
});
