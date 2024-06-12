import { redirect } from "next/navigation";
import { Paths } from "@/config/constants";
import { validateRequest } from "@/lib/auth/validate-request";
import { CreateProfileForm } from "./create-profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Create Your Profile",
  description: "Set up your profile.",
};

export default async function CreateProfilePage() {
  const { user } = await validateRequest();
  if (!user) redirect(Paths.Login);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
        <CardDescription>
          Fill out the form below to create your profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateProfileForm />
      </CardContent>
    </Card>
  );
}
