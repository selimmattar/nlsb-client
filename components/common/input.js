import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.Input}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "70%",
    borderColor: "#eee",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    padding: 5,
    paddingBottom: 0,
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    width: "100%"
  },
  input: {
    paddingRight: 5,
    paddingLeft: 4,
    paddingBottom: 5,
    color: "#FF0000",
    borderColor: "#333",
    fontSize: 18,
    fontWeight: "700",
    width: "100%"
  }
});
export { Input };
