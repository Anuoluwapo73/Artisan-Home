"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";

interface ClientProviderProps {
  children: ReactNode;
}

export default function ClientProvider({ children }: ClientProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
