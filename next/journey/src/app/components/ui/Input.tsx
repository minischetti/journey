"use client";
import React from "react";
import { Variants } from "../../page";
import { Label } from "./Label";

export function Input({
    label, name, placeholder, onChange, variant = Variants.default, value, type,
}: {
    label: string;
    name: string;
    placeholder: string;
    onChange: (e: any) => void;
    variant?: Variants;
    value?: string;
    type?: string;
}) {
    return (
        <div className="flex flex-col gap-1">
            <Label>{label}</Label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={`border border-zinc-700 focus:outline-zinc-800 outline-none rounded-md p-2 ${variant}`} />
        </div>
    );
}
