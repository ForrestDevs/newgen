import { Button } from "./button";

export function SidebarToggleButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="icon"
      className="mr-2 px-0 text-base focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        className="text-muted-foreground"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M5.5 6v8m-3-7.125V15a1.875 1.875 0 0 0 1.875 1.875h11.25A1.875 1.875 0 0 0 17.5 15V5a1.875 1.875 0 0 0-1.875-1.875H4.375A1.875 1.875 0 0 0 2.5 5v1.875Z"
        ></path>
      </svg>
      <span className="sr-only">Toggle Menu</span>
    </Button>
  );
}
