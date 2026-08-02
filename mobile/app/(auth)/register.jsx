import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../../store/useAuthStore";
import { colors, fonts, spacing, radius } from "../../constants/theme";

export default function Register() {
  const register = useAuthStore((state) => state.register);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.hero}>
          <Image source={require("../../assets/register-hero.png")} style={styles.heroImage} />
          <View style={styles.badge}>
            <View style={styles.badgeIcon}>
              <Ionicons name="star" size={11} color={colors.white} />
            </View>
            <Text style={styles.badgeText}>Bienvenue chez Marhba</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.subtitle}>Rejoignez l'expérience Marhba.</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Nom complet</Text>
              <TextInput
                placeholder="Votre nom"
                placeholderTextColor={colors.placeholder}
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="votre@email.com"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={styles.passwordWrapper}>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor={colors.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
                <Pressable
                  onPress={() => setShowPassword((v) => !v)}
                  style={({ pressed }) => [styles.eyeButton, pressed && styles.pressedFade]}
                  hitSlop={12}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={18}
                    color={colors.placeholder}
                  />
                </Pressable>
              </View>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              onPress={handleRegister}
              disabled={isSubmitting}
              style={({ pressed }) => [
                styles.button,
                isSubmitting && styles.buttonDisabled,
                pressed && styles.pressedFade,
              ]}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Inscription..." : "S'inscrire"}
              </Text>
              {!isSubmitting && (
                <Ionicons name="arrow-forward" size={12} color={colors.white} />
              )}
            </Pressable>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerLabel}>OU</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Déjà un compte ? </Text>
            <Link href="/(auth)" style={styles.footerLink}>
              Connectez-vous
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  hero: {
    height: 200,
    marginBottom: 32,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  badge: {
    position: "absolute",
    left: 20,
    bottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  badgeIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.heading,
  },
  content: {
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 31,
    gap: 8,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.heading,
    letterSpacing: -0.56,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.body,
    opacity: 0.8,
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 8,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.body,
    letterSpacing: 0.14,
  },
  input: {
    height: 44,
    borderRadius: radius.input,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.heading,
  },
  passwordWrapper: {
    justifyContent: "center",
  },
  eyeButton: {
    position: "absolute",
    right: 12,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: "#B3261E",
  },
  button: {
    height: 52,
    borderRadius: radius.button,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  pressedFade: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.white,
    letterSpacing: 0.14,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 31.5,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerLabel: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: "rgba(86,66,61,0.4)",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 31.5,
    flexWrap: "wrap",
  },
  footerText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.body,
  },
  footerLink: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.primary,
  },
});
