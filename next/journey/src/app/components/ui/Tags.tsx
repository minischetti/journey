"use client";
import React from "react";

export function Tags({ children }: { children: JSX.Element[]; variant?: Variants; }) {
    return <div className='tags'>{children}</div>;
}
