"use client";
import React from "react";

export function Tag({ name }: { name: string; onClose?: () => void; }) {
    return <div className="tag">{name}</div>;
}
