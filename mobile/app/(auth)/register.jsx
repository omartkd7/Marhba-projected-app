import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import useAuthStore from "../../store/useAuthStore";

export default function Register() {
  const register = useAuthStore((state) => state.register);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await register(fullName, email, password);
    } catch (err) {
      setError(err.response?.data?.error || "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Inscription</Text>

      <TextInput
        placeholder="Nom complet"
        value={fullName}
        onChangeText={setFullName}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 }}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12 }}
      />

      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

      <Pressable
        onPress={handleRegister}
        disabled={isSubmitting}
        style={{ backgroundColor: "#D85A30", padding: 14, borderRadius: 12, opacity: isSubmitting ? 0.6 : 1 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {isSubmitting ? "Inscription..." : "S'inscrire"}
        </Text>
      </Pressable>

      <Link href="/(auth)/login">J'ai déjà un compte</Link>
    </View>
  );
}
