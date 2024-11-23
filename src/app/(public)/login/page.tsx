"use client"

import {ReactElement, useActionState} from "react";
import {useTranslations} from "next-intl";
import {LayoutDashboard} from "lucide-react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {SvgIcons} from "@/components/svgIcons";
import {loginAction, LoginFormData} from "@/app/(public)/login/action";
import {TextInput} from "@/components/input/text";
import {PasswordInput} from "@/components/input/password";
import {CustomButton} from "@/components/custom/button";
import {CustomAlert} from "@/components/custom/alert";

const loginDefaultValues: LoginFormData = {
    username: "",
    password: "",
    alert: {show: false},
};

const loginSchema = z.object({
    username: z.preprocess(
        (value) => (value === '' ? undefined : value),
        z.string({ message: "validation.required" }),
    ),
    password: z.preprocess(
        (value) => (value === '' ? undefined : value),
        z.string({ message: "validation.required" }),
    ),
});

export default function LoginPage(): ReactElement {
    const t = useTranslations();
    const [formState, formAction, isPending] = useActionState(loginAction, loginDefaultValues);

    const {control} = useForm<LoginFormData>({
        mode: "all",
        defaultValues: loginDefaultValues,
        resolver: zodResolver(loginSchema),
    });

    return (
        <div className="w-full min-h-screen">
            <div className="flex justify-center my-28 mx-4">
                <Card className="w-full max-w-md">
                    <form action={formAction}>
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                <LayoutDashboard className="m-auto mb-2 size-10" />
                                {t("login.title")}
                            </CardTitle>
                            <CardDescription>{t("login.message")}</CardDescription>
                        </CardHeader>

                        <CardContent className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline">
                                    <SvgIcons.gitHub className="mr-2 h-4 w-4" />
                                    Github
                                </Button>
                                <Button variant="outline" className="text-red-500 hover:text-red-500">
                                    <SvgIcons.google className="mr-2 h-4 w-4" />
                                    Google
                                </Button>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-background px-2 text-muted-foreground">
                                      Or continue with
                                    </span>
                                </div>
                            </div>

                            <CustomAlert data={formState.alert} />

                            <TextInput
                                control={control}
                                label={t("username")}
                                name={"username"}
                                placeholder={"Croquextra"}
                            />

                            <PasswordInput
                                control={control}
                                label={t("password")}
                                name={"password"}
                            />
                        </CardContent>

                        <CardFooter>
                            <CustomButton
                                className={"w-full"}
                                label={t("signIn")}
                                loading={isPending}
                            />
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};
