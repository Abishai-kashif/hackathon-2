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
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1).max(62),
    email: z.string().email(),
    subject: z.string().optional(),
    message: z.string().min(3).max(500),
});

type FormType = z.infer<typeof formSchema>;

function ContactForm() {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
    });

    const [loading, setLoading] = useState(false);

    // localStorage implementation
    useEffect(() => {
        const savedForm = localStorage.getItem("contactDraft");
        if (savedForm) form.reset(JSON.parse(savedForm));
    }, []);

    useEffect(() => {
        const subscription = form.watch((values) => {
            localStorage.setItem("contactDraft", JSON.stringify(values));
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    const onSubmit = async (values: FormType) => {
        setLoading(true);

        const customErrorMessage =
            "An error occurred while sending your message";

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                // Handle all non-200 status codes
                console.error(customErrorMessage);
                toast.error(customErrorMessage);
                setLoading(false);
                return;
            }
        } catch (error) {
            console.error(customErrorMessage, error);
            toast.error(customErrorMessage);
            setLoading(false);
            return;
        }

        toast.success(
            <div>
                Thanks for your message,
                <br />
                <span className="font-semibold">{values.name}</span>
            </div>
        );

        form.reset({
            name: "",
            email: "",
            subject: "",
            message: "",
        });

        localStorage.removeItem("contactDraft");

        setLoading(false);
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
                                    disabled={loading}
                                    placeholder="Abc"
                                    className={`mt-5 block sm:w-[527px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
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
                                    className={`mt-5 block sm:w-[527px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
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
                                    className={`mt-5 block sm:w-[527px] w-full h-[75px] pl-6 border border-gray rounded-[10px] focus:outline-none text-[18px] focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
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
                                    disabled={loading}
                                    placeholder="Hi! i&rsquo;d like to ask about"
                                    className={`mt-5 block sm:w-[527px] w-full h-[120px] pl-6 pr-4 pt-4 border border-gray rounded-[10px] focus:outline-none text-[18px] resize-none focus:border-[1.5px] focus:border-black ${loading && "opacity-50"}`}
                                />
                            </FormControl>

                            <FormMessage className="text-sm text-red-500" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    variant={"outline"}
                    className="w-[237px] h-[48px] text-[16px] font-normal rounded-[15px] mt-5 flex items-center justify-center gap-3 "
                >
                    {loading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Submit"
                    )}
                </Button>
            </form>
        </Form>
    );
}

export default ContactForm;
