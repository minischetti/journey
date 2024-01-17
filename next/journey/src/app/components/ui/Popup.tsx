"use client";
import React from "react";

const Popup = ({ children }: { children: JSX.Element; }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-md p-2">{children}</div>
        </div>
    );
};

export { Popup };