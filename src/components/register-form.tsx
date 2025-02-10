"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import components
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
} from "./ui/form";

const formSchema = z.object({
    email: z.string().email(),
});

type FormType = z.infer<typeof formSchema>;

function RegisterForm() {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
    });

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-[34px] justify-between w-full"
                onSubmit={form.handleSubmit((values) => {
                    console.log("Submitted values", values);
                })}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                Email address
                            </FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="text"
                                    id="registerEmail"
                                    // autoComplete="email"
                                    className="mt-4 block sm:w-[423px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black"
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

                <p className="text-[16px] text-black font-light max-w-[453px]">
                    A link to set a new password will be sent to your email
                    address.
                </p>

                <p className="text-[16px] text-black font-light max-w-[453px] relative top-[-20px]">
                    <span className="sm:[word-spacing:0.5rem]">
                        Your personal data will be used to support your{" "}
                    </span>
                    experience throughout this website, to manage access to your
                    account, and for other purposes described in our{" "}
                    <span className="font-semibold">privacy policy.</span>
                </p>

                <button
                    type="submit"
                    className=" w-[215px] h-[64px] text-[20px] rounded-[15px] border border-black hover:bg-black hover:text-white transition"
                >
                    Register
                </button>
            </form>
        </Form>
    );
}

export default RegisterForm;
