import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import api from "../../services/api";

export default function Index() {
  const [result, setResult] = useState("");

  const testConnection = async () => {
    try {
      const res = await api.get("/auth/me");
      setResult("✅ Réponse: " + JSON.stringify(res.data));
    } catch (err) {
      if (err.response) {
        // L'serveur jaweb (7ta ila 401) → LA CONNEXION KHDDAMA ✅
        setResult(`✅ Backend joignable — status ${err.response.status}`);
      } else {
        setResult("❌ Backend injoignable: " + err.message);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, gap: 12 }}>
      <Text style={{ fontSize: 24 }}>Marhba — test</Text>
      <Link href="/(auth)/login">→ Login</Link>
      <Link href="/(auth)/register">→ Register</Link>
      <Link href="/(app)/home">→ Home</Link>
      <Pressable onPress={testConnection} style={{ backgroundColor: "#D85A30", padding: 14, borderRadius: 12 }}>
        <Text style={{ color: "white", textAlign: "center" }}>Tester le backend</Text>
      </Pressable>
      <Text>{result}</Text>
    </View>
  );
}
