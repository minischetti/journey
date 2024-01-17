"use client";
import React, { useState } from "react";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { Variants } from "../../page";

const Accordion = ({ title, children, variant }: { title: string; children: JSX.Element | JSX.Element[]; variant?: Variants; }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div className={`cursor-pointer select-none border border-zinc-600 bg-zinc-700 rounded-md ${variant}`}>
            <div onClick={toggleAccordion} className="flex justify-between p-2 cursor-pointer">
                <h2>{title}</h2>
                <button>{isOpen ? <EyeClosed /> : <Eye />}</button>
            </div>
            {isOpen && (
                <div className="m-2">
                    <hr className="m-2"></hr>
                    {children}
                </div>
            )}
        </div>
    );
};

export { Accordion };
