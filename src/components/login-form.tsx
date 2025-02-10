"use client";

import Link from "next/link";
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
import { Checkbox } from "./ui/checkbox";

const formSchema = z.object({
    nameOrEmail: z.string().nonempty("Name or email is required"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long"),

    rememberMe: z.boolean().optional(),
});

type FormType = z.infer<typeof formSchema>;

function LoginForm() {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            rememberMe: false,
        },
    });

    const onSubmit = async (values: FormType) => {
        const { nameOrEmail, password, rememberMe } = values;

        console.log("Submitted values");
        console.log({ nameOrEmail, password, rememberMe });
    };

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-[34px] justify-between w-full"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="nameOrEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                Username or email address
                            </FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    className="mt-4 block sm:w-[423px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black"
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block  text-[16px] font-medium  text-black">
                                Password
                            </FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    className="mt-4 block sm:w-[423px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black"
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex items-center">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="ml-2 text-sm text-gray-700 cursor-pointer">
                                    Remember me
                                </FormLabel>
                            </div>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

                <div className="flex  flex-col sm:flex-row sm:items-center gap-[30px] ">
                    <button
                        type="submit"
                        className="w-[215px] h-[64px] text-[20px] rounded-[15px] border border-black hover:bg-black hover:text-white transition"
                    >
                        Log In
                    </button>
                    <Link
                        href="#registerEmail"
                        className="text-[16px] font-light mt-2.5 sm:mx-0 mx-auto hover:underline underline-offset-4"
                    >
                        Lost Your Password?
                    </Link>
                </div>
            </form>
        </Form>
    );
}

export default LoginForm;
