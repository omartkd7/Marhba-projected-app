import { View, Text, Pressable, Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../../store/useAuthStore";
import { colors, fonts, spacing, radius } from "../../constants/theme";

export default function Home() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      Alert.alert("Erreur", err?.message || "La déconnexion a échoué");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.greetingIcon}>
          <Ionicons name="sparkles" size={24} color={colors.heading} />
        </View>
        <Text style={styles.title}>Marhba, {user?.fullName || "invité"} 👋</Text>
        <Text style={styles.subtitle}>
          Your secure gateway to Moroccan digital hospitality is ready.
        </Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.body} />
            <Text style={styles.statLabel}>Verified</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time-outline" size={20} color={colors.body} />
            <Text style={styles.statLabel}>Activity</Text>
          </View>
        </View>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutButton, pressed && styles.logoutButtonPressed]}
        >
          <Ionicons name="log-out-outline" size={15} color={colors.heading} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenPadding,
    justifyContent: "space-between",
    paddingBottom: 48,
  },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  greetingIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    backgroundColor: colors.greetingIconBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 24,
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.heading,
    letterSpacing: -0.7,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.bodySubtle,
    textAlign: "center",
    maxWidth: 280,
    opacity: 0.8,
  },
  actions: {
    gap: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.statCardBackground,
    borderRadius: radius.card,
    paddingVertical: 24,
    alignItems: "center",
    gap: 12,
  },
  statLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.body,
    letterSpacing: 0.14,
  },
  logoutButton: {
    height: 44,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.placeholder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  logoutButtonPressed: {
    opacity: 0.6,
  },
  logoutText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.heading,
  },
});
