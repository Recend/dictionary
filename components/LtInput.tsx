import { View, Text, TextInput, StyleSheet } from 'react-native';

export interface Props {
  label: string;
  textInputConfig: {};
}

function LtInput({ label, textInputConfig }: Props) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.text}>{label}</Text>
      <TextInput style={styles.inputBox} {...textInputConfig} />
    </View>
  );
}
export default LtInput;

const styles = StyleSheet.create({
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: '80%',
    height: 50,
    borderWidth: 2,
    borderColor: '#42a832',
    borderRadius: 5,
    justifyContent: 'center',
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    color: 'grey',
    backgroundColor: 'lightgrey',
  },
  text: {
    color: 'grey',
  },
});
