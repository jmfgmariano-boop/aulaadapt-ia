import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function Screen({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.kicker}>AulaAdapt IA</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      {children}
    </View>
  );
}

export function Card({
  title,
  subtitle,
  children,
  tint = "white"
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  tint?: "white" | "mint" | "sky";
}) {
  const backgrounds = {
    white: "#FFFFFF",
    mint: "#EEF9F5",
    sky: "#EFF8FB"
  };

  return (
    <View style={[styles.card, { backgroundColor: backgrounds[tint] }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

export function Pill({ label }: { label: string }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

export function ActionButton({ label, secondary = false }: { label: string; secondary?: boolean }) {
  return (
    <Pressable style={[styles.button, secondary ? styles.buttonSecondary : styles.buttonPrimary]}>
      <Text style={[styles.buttonText, secondary ? styles.buttonTextSecondary : styles.buttonTextPrimary]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    gap: 16
  },
  header: {
    gap: 8
  },
  kicker: {
    alignSelf: "flex-start",
    backgroundColor: "#E7EFF2",
    color: "#14354A",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    fontWeight: "700"
  },
  title: {
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "800",
    color: "#173042"
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#5D7383"
  },
  card: {
    borderRadius: 24,
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: "#D8E1E5"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#173042"
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#5D7383",
    lineHeight: 20
  },
  pill: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#E8F5F7"
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#14354A"
  },
  button: {
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: "center"
  },
  buttonPrimary: {
    backgroundColor: "#14354A"
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E1E5"
  },
  buttonText: {
    fontWeight: "800"
  },
  buttonTextPrimary: {
    color: "#FFFFFF"
  },
  buttonTextSecondary: {
    color: "#14354A"
  }
});
