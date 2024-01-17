"use client";
import React from "react";

export function Bar({ children }: { children: JSX.Element[]; }) {
    return <div className="flex flex-row justify-center items-center p-8">{children}</div>;
}