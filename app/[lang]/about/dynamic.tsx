"use client";
import { ClientComponent } from "./ClientComponent";

// just a quick fix for 
// https://github.com/DigitecGalaxus/swc-plugin-translation-importer/issues/13
export const Dynamic = () => {
    return <ClientComponent />
}