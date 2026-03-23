import { ScrollView, StyleSheet, Text, View } from "react-native";
import { materials } from "@aulaadapt/mocks";
import { Card, Pill, Screen } from "../../components/ui";

const material = materials[0];

export default function MaterialsScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Screen title="Materiales" subtitle="Resumen, pasos, conceptos y glosario en formato limpio y accesible.">
        <Card title="Resumen accesible" subtitle={material.summary} />
        <Card title="Version simplificada" subtitle={material.simplifiedVersion} tint="sky">
          <View style={styles.row}>
            {material.selectedAdaptations.map((adaptation) => (
              <Pill key={adaptation} label={adaptation.replaceAll("_", " ")} />
            ))}
          </View>
        </Card>
        <Card title="Pasos de la actividad" tint="mint">
          <View style={styles.list}>
            {material.steps.map((step, index) => (
              <Text key={step} style={styles.item}>
                {index + 1}. {step}
              </Text>
            ))}
          </View>
        </Card>
        <Card title="Glosario sencillo">
          <View style={styles.list}>
            {material.glossary.map((entry) => (
              <Text key={entry.term} style={styles.item}>
                {entry.term}: {entry.definition}
              </Text>
            ))}
          </View>
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
  list: {
    gap: 10
  },
  item: {
    fontSize: 14,
    lineHeight: 21,
    color: "#173042"
  }
});
