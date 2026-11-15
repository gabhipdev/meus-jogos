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
      {/* O label é o textinho em cima do input */}
      <Text style={styles.label}>{label}</Text>
      
      {/* TextInput é o campo de digitação do React Native */}
      <TextInput
        style={styles.input}
        value={valor} // Campo controlado (o valor vem do estado)
        onChangeText={aoMudar} // Quando digita, avisa a tela pai
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        keyboardType={keyboardType} // 'numeric' para o ano, por exemplo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    marginBottom: 12 
  },
  label: { 
    fontSize: 13, 
    fontWeight: '600', 
    color: '#374151', 
    marginBottom: 6 
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: '#FFF',
    color: '#111827',
  },
});