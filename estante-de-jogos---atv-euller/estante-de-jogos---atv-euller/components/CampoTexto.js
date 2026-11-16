import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CampoTexto({
  label,
  valor,
  aoMudar,
  placeholder,
  keyboardType = 'default',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={aoMudar}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: 'bold', color: '#A0A0B0', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#2A2A3A',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#1A1A24',
    color: '#FFF',
  },
});