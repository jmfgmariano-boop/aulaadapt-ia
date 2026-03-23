import { ScrollView, StyleSheet, Text, View } from "react-native";
import { materials } from "@aulaadapt/mocks";
import { Card, Pill, Screen } from "../../components/ui";

const material = materials[0];

export default function StudentHomeScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Screen title="Clase del dia" subtitle="Una experiencia simple para revisar lo importante despues de clase.">
        <Card title={material.title} subtitle={material.summary}>
          <View style={styles.row}>
            <Pill label="Biologia" />
            <Pill label="22 mar 2026" />
          </View>
        </Card>
        <Card title="Tarea" subtitle={material.homeworkReminder} tint="mint">
          <Text style={styles.helper}>Encuentra resumen, pasos y glosario en menos de tres toques.</Text>
        </Card>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F4F7F8"
  },
  content: {
    paddingBottom: 28
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  helper: {
    fontSize: 14,
    lineHeight: 20,
    color: "#5D7383"
  }
});
