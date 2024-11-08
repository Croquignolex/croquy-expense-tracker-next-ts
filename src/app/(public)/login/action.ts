import { z } from 'zod';

export const loginSchema = z.object({
    username: z.preprocess(
        (value) => (value === '' ? undefined : value),
        z.string({ message: 'username is required2' }),
    ),
    /*password: z.preprocess(
        (value) => (value === '' ? undefined : value),
        z.string({ message: 'password is required' }),
    ),*/
});

export async function loginAction(data) {
    // const submission = parseWithZod(formData, {schema: loginSchema})

    // console.log('submission.reply()', submission.reply())

    // if (submission.status !== 'success') {
    //     return submission.reply();
    // }
    console.log({data})
}