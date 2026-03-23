import { generatedMaterials, student } from "../../lib/data";
import { StudentPageClient } from "./StudentPageClient";

const material = generatedMaterials[0];

export default function StudentPage() {
  return <StudentPageClient material={material} student={student} />;
}
