import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
const Spinner = ({ size }) => {
  return <ActivityIndicator style={styles.spinner} size={size || "large"} />;
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export { Spinner };
