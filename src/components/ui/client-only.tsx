"use client";

import React, { useState } from "react";

export function ClientOnly({
  children,
  ...delegated
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
}
