"use client"

import {ReactElement} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Card, CardDescription, CardFooter, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

export default function LoginPage(): ReactElement {
    return (
        <div className="w-full lg:grid lg:grid-cols-1 min-h-screen">
            <div className="flex items-center justify-center">
                <div className="mx-auto grid gap-6">
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>
                                Enter your email below to login to your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Sign in</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};
