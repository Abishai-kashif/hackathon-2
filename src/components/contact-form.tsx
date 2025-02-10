"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// import components
import { Button } from "./ui/button";
import {
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormField,
} from "./ui/form";

// define form schema
const formSchema = z.object({
    name: z.string().min(1).max(62),
    email: z.string().email(),
    subject: z.string().optional(),
    message: z.string().min(5).max(200),
});

type FormType = z.infer<typeof formSchema>;

function ContactForm() {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormType) => {
        console.log("Submitted values", values);
    };

    return (
        <Form {...form}>
            <form className="space-y-9" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                Your name
                            </FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    placeholder="Abc"
                                    className="mt-5 block sm:w-[527px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black"
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

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
                                    placeholder="Abc@def.com"
                                    className="mt-5 block sm:w-[527px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black"
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                Subject
                            </FormLabel>
                            <FormControl>
                                <input
                                    {...field}
                                    placeholder="This is an optional"
                                    className="mt-5 block sm:w-[527px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black"
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="block text-[16px] font-medium text-black cursor-pointer">
                                Message
                            </FormLabel>
                            <FormControl>
                                <textarea
                                    {...field}
                                    placeholder="Hi! i&rsquo;d like to ask about"
                                    className="mt-5 block sm:w-[527px] w-full h-[120px] pl-6 pt-4 border border-gray rounded-[10px] focus:outline-none text-[18px] resize-none focus:border-[1.5px] focus:border-black"
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    variant={"outline"}
                    className="w-[237px] h-[48px] text-[16px] font-normal rounded-[15px] mt-5"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
}

export default ContactForm;
