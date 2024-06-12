import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { validateRequest } from "@/lib/auth/validate-request";

interface NavbarProps {
  title: string;
}

export async function Navbar({ title }: NavbarProps) {
  const { user, session } = await validateRequest();

  if (!user || !session) return null;

  return (
    <header className="sticky top-0 z-10 w-full bg-primary-foreground shadow dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ModeToggle />
          <UserNav user={user} session={session} />
        </div>
      </div>
    </header>
  );
}
