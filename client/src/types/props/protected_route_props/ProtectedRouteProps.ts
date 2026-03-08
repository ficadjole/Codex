import type { JSX } from "react";

export type ProtectedRouteProps = {
    children: JSX.Element;
    roles?: string[];
}