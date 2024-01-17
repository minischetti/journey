"use client";
import React from "react";
import { Variants } from "../../page";
import { Label } from "./Label";

export function Select({
    label, name, children, variant = Variants.default, value, onChange,
}: {
    label: string;
    name: string;
    children: JSX.Element[];
    variant?: Variants;
    value?: string;
    onChange?: (e: any) => void;
}) {
    return (
        <div className="flex flex-col gap-1">
            <Label>{label}</Label>
            <select
                name={name}
                className={`border border-zinc-700 focus:outline-zinc-800 outline-none rounded-md p-2 ${variant}`}
                value={value}
                onChange={onChange}>
                {children}
            </select>
        </div>
    );
}
