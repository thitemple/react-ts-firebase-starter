import { ComponentType } from "react";

export type Route<T = unknown> = {
  path: string;
  component: ComponentType<T>;
  name: string;
  protected: boolean;
};
