"use client";
import React from "react";
import { Label } from "./Label";

export function Input({
    label, name, placeholder, onChange, value, type,
}: {
    label: string;
    name: string;
    placeholder: string;
    onChange: (e: any) => void;
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
            />
        </div>
    );
}
