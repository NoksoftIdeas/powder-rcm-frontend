import { withAuth } from "../components/auth/withAuth";

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <p>This is the Settings page.</p>
    </div>
  );
}

export default withAuth(SettingsPage);
