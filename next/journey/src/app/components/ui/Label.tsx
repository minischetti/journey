"use client";
import React from "react";

export function Label({ children }: { children: JSX.Element; }) {
    return <label className="text-xs uppercase font-bold">{children}</label>;
}
