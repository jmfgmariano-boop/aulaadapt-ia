import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Card, Pill, Screen } from "../../components/ui";

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Screen title="Configuracion" subtitle="Ajustes de accesibilidad, privacidad y uso responsable visibles en toda la experiencia.">
        <Card title="Preferencias">
          <View style={styles.row}>
            <Pill label="Idioma: Espanol" />
            <Pill label="Texto: Grande" />
            <Pill label="Ruido visual reducido" />
          </View>
        </Card>
        <Card title="Uso responsable" subtitle="La IA apoya. El docente decide." tint="mint">
          <Text style={styles.copy}>No se realizan diagnosticos ni clasificaciones clinicas. Solo apoyos pedagogicos neutrales.</Text>
        </Card>
        <Card title="Privacidad" tint="sky">
          <Text style={styles.copy}>Los reportes administrativos son agregados y la informacion sensible se protege por rol.</Text>
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
  copy: {
    fontSize: 14,
    lineHeight: 21,
    color: "#173042"
  }
});
