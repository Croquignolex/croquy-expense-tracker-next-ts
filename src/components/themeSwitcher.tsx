"use client";

import {ReactElement} from "react";
import {useTheme} from "next-themes";
import {useTranslations} from "next-intl";
import {Moon, Sun} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const ThemeSwitcher = (): ReactElement => {
    const { setTheme, theme } = useTheme();
    const t = useTranslations();

    const supportedThemes: Array<{code: string, label: string}> = [
        {code: "light", label: t("light")},
        {code: "dark", label: t("dark")},
        {code: "system", label: t("system")},
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {supportedThemes.map(({code, label}, index: number): ReactElement => (
                    <DropdownMenuCheckboxItem
                        key={index}
                        checked={code === theme}
                        onCheckedChange={() => setTheme(code)}
                    >
                        {label}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export {ThemeSwitcher};