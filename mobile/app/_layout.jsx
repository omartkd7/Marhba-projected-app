import { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import useAuthStore from "../store/useAuthStore";
import { colors, fonts } from "../constants/theme";

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  const logout = useAuthStore((state) => state.logout);

  const [fontsLoaded] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    restoreSession();
  }, []);

  useEffect(() => {
    // État incohérent (session "connectée" sans utilisateur réel) → on repart proprement sur Login.
    if (!isLoading && isAuthenticated && !user) {
      logout();
    }
  }, [isLoading, isAuthenticated, user]);

  if (isLoading || !fontsLoaded) {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Marhba</Text>
        <Text style={styles.tagline}>AUTHENTIC SECURITY</Text>

        <View style={styles.bottom}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.status}>Preparing your sanctuary...</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.splashBackground,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 96,
    height: 96,
  },
  title: {
    marginTop: 24,
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.primary,
    letterSpacing: -0.7,
  },
  tagline: {
    marginTop: 4,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.body,
    opacity: 0.6,
    letterSpacing: 2.8,
  },
  bottom: {
    position: "absolute",
    bottom: 96,
    width: "100%",
    maxWidth: 280,
    alignItems: "center",
  },
  status: {
    marginTop: 24,
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.body,
  },
  progressTrack: {
    marginTop: 32,
    width: "100%",
    height: 2,
    borderRadius: 9999,
    backgroundColor: "rgba(220, 193, 186, 0.3)",
    overflow: "hidden",
  },
  progressFill: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
  },
});
