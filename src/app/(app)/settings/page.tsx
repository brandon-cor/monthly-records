import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { SettingsAvatarPicker } from "@/components/settings/settings-avatar-picker";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/");
  }

  const { user } = session;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-press-start)] text-base tracking-wider sm:text-lg">
          SETTINGS
        </h1>
        <p className="font-[family-name:var(--font-vt323)] text-lg tracking-wider text-muted-foreground">
          Manage your account
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-press-start)] text-[10px] tracking-wider">
            PROFILE PICTURE
          </CardTitle>
          <p className="font-[family-name:var(--font-vt323)] text-base tracking-wide text-muted-foreground">
            Choose your avatar
          </p>
        </CardHeader>
        <CardContent>
          <SettingsAvatarPicker />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-[family-name:var(--font-press-start)] text-[10px] tracking-wider">
            SIGN OUT
          </CardTitle>
          <p className="font-[family-name:var(--font-vt323)] text-base tracking-wide text-muted-foreground">
            Sign out of your account
          </p>
        </CardHeader>
        <CardContent>
          <SignOutButton />
        </CardContent>
      </Card>
    </div>
  );
}
