"use client";
import React, { useState } from "react";
import * as Types from "../../types";

export function Item({
    name, description, status, items, tags, children,
}: {
    name: string;
    description: string;
    status: string;
    items: Types.Item[];
    tags: Types.Tag[];
    children: JSX.Element[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="grid border border-gray-400 rounded-md p-4 gap-2">
            <h2>{name}</h2>
            <div>{description}</div>
            <div className="flex flex-row gap-2">{children}</div>
        </div>
    );
}
