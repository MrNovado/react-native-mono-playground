import React from "react";
import { StyleSheet, View, Text } from "react-native";

export function Test(props: { text?: string }) {
  const text = props.text || "Test!";
  return (
    <View style={styles.box}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: "bold" },
});
