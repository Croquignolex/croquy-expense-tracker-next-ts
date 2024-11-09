import { z } from 'zod';

export type LoginFormData = {
    username: string;
    password: string;
};

export const loginDefaultValues: LoginFormData = {
    username: "",
    password: "",
};

export const loginSchema = z.object({
    username: z.preprocess(
        (value) => (value === '' ? undefined : value),
        z.string({ message: "validation.required" }),
    ),
    password: z.preprocess(
        (value) => (value === '' ? undefined : value),
        z.string({ message: "validation.required" }),
    ),
});

export async function loginAction(data) {
    // const submission = parseWithZod(formData, {schema: loginSchema})

    // console.log('submission.reply()', submission.reply())

    // if (submission.status !== 'success') {
    //     return submission.reply();
    // }
    console.log({data})
}