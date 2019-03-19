import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
const Button = ({ OnPress, children }) => {
  return (
    <TouchableOpacity onPress={OnPress} style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    marginTop: 20,
    marginBottom: 150,
    padding: 20,
    width: "40%",
    backgroundColor: "#00aeef",
    borderRadius: 4,
    alignItems: "center"
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 15
  }
});
export { Button };
