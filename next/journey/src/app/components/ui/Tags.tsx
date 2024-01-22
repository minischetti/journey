"use client";
import React from "react";

export function Tags({ children }: { children: JSX.Element[]; variant?: Variants; }) {
    return <div className='grid grid-flow-row gap-2 py-2'>{children}</div>;
}
