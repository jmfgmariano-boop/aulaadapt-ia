import { teacher } from "../../lib/data";
import { ProfileClient } from "./ProfileClient";

export default function ProfilePage() {
  return <ProfileClient defaultName={teacher.name} />;
}
