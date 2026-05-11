"use client"

import { Toaster as HotToaster } from "react-hot-toast"

export const Toaster = HotToaster

export function ToasterProvider() {
  return <HotToaster position="top-right" />
}
