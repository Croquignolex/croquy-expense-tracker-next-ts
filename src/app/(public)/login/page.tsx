"use client"

import {ReactElement} from "react";
import {useTranslations} from "next-intl";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {LayoutDashboard} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Card, CardDescription, CardFooter, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {SvgIcons} from "@/components/svgIcons";
import TextField from "@/components/form/textField";
import PasswordField from "@/components/form/passwordField";
import useLoginPageHook, {LoginFormType, LoginPageHookType} from "@/app/(public)/login/useLoginPageHook";
import CustomAlert from "@/components/CustomAlert";
import CustomButton from "@/components/CustomButton";

export default function LoginPage(): ReactElement {
    const t = useTranslations();

    const {handleLogin, isLoginPending, loginAlertData}: LoginPageHookType = useLoginPageHook();

    const initialValues: LoginFormType = {username: "", password: ""};

    const validationSchema: Yup.ObjectSchema<LoginFormType> = Yup.object().shape({
        username: Yup.string().required(t("validation.required")),
        password: Yup.string().required(t("validation.required")),
    });

    return (
        <div className="w-full min-h-screen">
            <div className="flex justify-center my-28 mx-4">
                <Card className="w-full max-w-md">
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
                        {() => (
                            <Form>
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

                                    <CustomAlert data={loginAlertData} />

                                    <TextField
                                        label={t("username")}
                                        name={"username"}
                                        placeholder={"Croquextra"}
                                    />
                                    <PasswordField
                                        label={t("password")}
                                        name={"password"}
                                    />
                                </CardContent>

                                <CardFooter>
                                    <CustomButton
                                        className={"w-full"}
                                        label={t("signIn")}
                                        loading={isLoginPending}
                                    />
                                </CardFooter>
                            </Form>
                        )}
                    </Formik>
                </Card>
            </div>
        </div>
    );
};
