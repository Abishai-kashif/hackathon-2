import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

function SuccessStripe() {
    return (
        <main className="my-28">
            <div className="md:max-w-[50vw] mx-auto ">
                <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6 animate-bounce" />
                <div className="text-center">
                    <h3 className="md:text-[36px] text-[24px] text-black font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray my-2">
                        Thank you for your purchase, We hope enjoy it
                    </p>
                    <p className="mb-4 text-gray">Have a great day!</p>

                    <Button className="bg-green-600 rounded-none px-4 py-2">
                        <Link href={"/"} className="font-medium text-lg">
                            Go back
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}

export default SuccessStripe;
