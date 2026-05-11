"use client"

import React from "react"

export function SidebarProvider({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex" {...props}>
      {children}
    </div>
  )
}
