"use client";
import React from "react";

export function List({ children }: { children: JSX.Element[]; }) {
    return <div className="flex flex-col gap-2 w-full">{children}</div>;
}
