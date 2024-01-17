"use client";
import React from "react";
import { Variants } from "../../page";

export function Tags({ children, variant = Variants.default }: { children: JSX.Element[]; variant?: Variants; }) {
    return <div className={`grid grid-flow-row gap-2 py-2 ${variant}`}>{children}</div>;
}
