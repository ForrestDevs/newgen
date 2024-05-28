// "use client";

// import { LucideSidebarClose, LucideSidebarOpen } from "lucide-react";
// import { Button } from "@/components/ui/button";
// // import { ScrollArea } from "@/components/ui/scroll-area";
// import { Sheet, SheetContentv2, SheetTrigger } from "@/components/ui/sheet";
// import { SidebarItems } from "./app-sidebar";
// // import { siteConfig } from "@/config/site";
// import { useAppShell } from "./app-shell";
// import { useState, useRef, useEffect } from "react";
// // import { MobileLink } from "@/components/layout/docs/doc-mobile-nav";
// // import { Icons } from "@/components/icons";

// export function AppSidebarToggle() {
//   const { toggleSidebar, isSidebarCollapsed, isSidebarCollapsedMobile } =
//     useAppShell();

//   // if (!toggleSidebar) {
//   //   return null;
//   // }

//   const [renderMobile, setRenderMobile] = useState(false);
//   const initialRender = useRef(false);

//   const handleResize = () => {
//     setRenderMobile(window.innerWidth < 768);
//   };

//   useEffect(() => {
//     if (!initialRender.current) {
//       initialRender.current = true;
//       handleResize();
//     }
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (renderMobile) {
//     return (
//       <Sheet open={isSidebarCollapsedMobile} onOpenChange={toggleSidebar}>
//         <SheetTrigger asChild>
//           <Button
//             variant="ghost"
//             className="hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
//           >
//             {isSidebarCollapsedMobile ? (
//               <LucideSidebarClose />
//             ) : (
//               <LucideSidebarOpen />
//             )}
//           </Button>
//         </SheetTrigger>
//         <SheetContentv2 side="left" className="pr-0 bg-primary-foreground absolute top-16 h-auto overflow-y-hidden w-[250px]">
//           <SidebarItems />
//           <div
//             id="sidebar-handle"
//             className="md:flex hidden w-[1px] bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90"
//           />
//         </SheetContentv2>
//       </Sheet>
//     );
//   }
//   return (
//     <Button
//       className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
//       variant="ghost"
//       onClick={() => {
//         toggleSidebar();
//       }}
//     >
//       {isSidebarCollapsed ? <LucideSidebarOpen /> : <LucideSidebarClose />}
//     </Button>
//   );
// }
