import { generatedMaterials, teacherGroups } from "../../../lib/data";
import { MaterialsReviewClient } from "./MaterialsReviewClient";

const material = generatedMaterials[0];

export default function MaterialsReviewPage() {
  return <MaterialsReviewClient material={material} teacherGroups={teacherGroups} />;
}
