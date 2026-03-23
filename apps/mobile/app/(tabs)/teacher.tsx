import { ScrollView, StyleSheet, Text, View } from "react-native";
import { adaptationOptions, outputOptions } from "@aulaadapt/design-system";
import { Card, ActionButton, Pill, Screen } from "../../components/ui";

export default function TeacherQuickScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Screen title="Flujo docente" subtitle="Acciones rapidas para generar y revisar materiales desde movil.">
        <Card title="Nueva clase" subtitle="Captura tema, puntos clave y tarea. La revision detallada sigue viva en web.">
          <View style={styles.row}>
            <ActionButton label="Generar borrador" />
            <ActionButton label="Guardar" secondary />
          </View>
        </Card>
        <Card title="Salidas sugeridas" tint="sky">
          <View style={styles.row}>
            {outputOptions.slice(0, 4).map((output) => (
              <Pill key={output} label={output} />
            ))}
          </View>
        </Card>
        <Card title="Adaptaciones neutrales" subtitle="Sin etiquetas clinicas y con lenguaje pedagogico." tint="mint">
          <View style={styles.list}>
            {adaptationOptions.slice(0, 4).map((adaptation) => (
              <Text key={adaptation.id} style={styles.item}>
                - {adaptation.label}: {adaptation.description}
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
    gap: 10
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
