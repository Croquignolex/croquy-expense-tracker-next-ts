"use client";

import {ReactElement} from "react";
import {useLocale} from "next-intl";
import {Languages, ChevronDown} from "lucide-react";

import {Button} from "@/components/ui/button";
import {setUserLocale} from "@/i18n/service";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const LocaleSwitcher = (): ReactElement => {
    const locale: string = useLocale();

    const supportedLocales: Array<{code: string, label: string}> = [
        {code: "en", label: "English"},
        {code: "fr", label: "Français"},
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Languages className="mr-1 size-4" />
                    {supportedLocales.find((lang): boolean => lang.code === locale)?.label}
                    <ChevronDown className="ml-1 size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {supportedLocales.map(({code, label}, index: number): ReactElement => (
                    <DropdownMenuCheckboxItem
                        key={index}
                        checked={code === locale}
                        onCheckedChange={async (): Promise<void> => await setUserLocale(code)}
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export {LocaleSwitcher};
