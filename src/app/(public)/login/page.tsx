"use client"

import {ReactElement} from "react";
import {useTranslations} from "next-intl";
import {LayoutDashboard} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardContent, CardHeader, CardTitle, CardFooter} from "@/components/ui/card";
import {SvgIcons} from "@/components/svgIcons";
import {loginAction, loginSchema} from "@/app/(public)/login/action";
import {TextInput} from "@/components/input/text";
import {PasswordInput} from "@/components/input/password";
import {CustomButton} from "@/components/custom/button";
import clsx from "clsx";
import {Input} from "@/components/ui/input";
import {useForm, Controller } from "react-hook-form";

type FormData = {
    username: string;
};

export default function LoginPage(): ReactElement {
    const t = useTranslations();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        mode: "all",
        defaultValues: {
            username: "bonjpour"
        },
        resolver: zodResolver(loginSchema),
    });

    return (
        <div className="w-full min-h-screen">
            <div className="flex justify-center my-28 mx-4">
                <Card className="w-full max-w-md">
                    <form onSubmit={handleSubmit(loginAction)}>
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

                            <Controller
                                name="username"
                                control={control}
                                render={({ field }) => {
                                    console.log({field})
                                    console.log("errors.username", errors.username)
                                    const isInvalid = !!errors.username

                                    return (
                                        <>
                                            <Input
                                                // type={type}
                                                // placeholder={placeholder}
                                                id={field.name}
                                                name={field.name}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                ref={field.ref}
                                                value={field.value}
                                                className={clsx({"border border-red-500 text-red-500": isInvalid})}
                                            />

                                            {isInvalid && (
                                                <p className="text-red-500 text-sm">{errors.username.message}</p>
                                            )}
                                        </>
                                    )
                                }}
                            />
                           {/* <TextInput
                                label={t("username")}
                                field={fields.username}
                                placeholder={"Croquextra"}
                            />*/}
                            {/*<PasswordInput
                                label={t("password")}
                                field={fields.password}
                            />*/}
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
