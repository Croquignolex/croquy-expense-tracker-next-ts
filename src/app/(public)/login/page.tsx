"use client"

import {ReactElement, useActionState} from "react";
import {useTranslations} from "next-intl";
import {LayoutDashboard} from "lucide-react";
import {parseWithZod} from "@conform-to/zod";
import {useForm} from "@conform-to/react";

import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {SvgIcons} from "@/components/svgIcons";
import {loginAction, loginSchema} from "@/app/(public)/login/action";
import {TextInput} from "@/components/input/text";
import {PasswordInput} from "@/components/input/password";
import {CustomButton} from "@/components/custom/button";

export default function LoginPage(): ReactElement {
    const t = useTranslations();
    const [lastResult, action] = useActionState(loginAction, undefined);

    const [form, fields] = useForm({
        lastResult,

        onValidate({ formData }) {
            return parseWithZod(formData, { schema: loginSchema });
        },

        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    return (
        <div className="w-full min-h-screen">
            <div className="flex justify-center my-28 mx-4">
                <Card className="w-full max-w-md">
                    <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
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

                            {/*<CustomAlert data={loginAlertData} />*/}

                            <TextInput
                                label={t("username")}
                                field={fields.username}
                                placeholder={"Croquextra"}
                            />
                            <PasswordInput
                                label={t("password")}
                                field={fields.password}
                            />
                        </CardContent>

                        <CardFooter>
                            <CustomButton
                                className={"w-full"}
                                label={t("signIn")}
                                loading={false}
                            />
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
};
