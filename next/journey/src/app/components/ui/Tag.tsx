"use client";
import React from "react";

export function Tag({ name }: { name: string; onClose?: () => void; }) {
    return <div className="py-1 px-2 grid grid-flow-col gap-2 rounded-md bg-zinc-600 justify-between items-center text-sm">{name}</div>;
}
