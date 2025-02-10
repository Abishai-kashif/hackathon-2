import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";

function ErrorStripe() {
    return (
        <main className="my-28">
            <div className="md:w-[50vw] mx-auto">
                <div className="text-center">
                    {/* face */}
                    <Frown className="text-red-600 w-20 h-20 mx-auto my-6 animate-bounce" />

                    <h1 className="text-4xl font-bold mb-2 text-red-700">
                        Payment Failed
                    </h1>
                    <p className="text-lg mb-4 md:max-w-[29rem] mx-auto">
                        Unfortunately, your payment could not be processed.
                        Please try again or contact support if the issue
                        persists.
                    </p>
                    <Button variant={"destructive"}>
                        <Link href="/" className="text-lg font-semibold">
                            Go back
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}

export default ErrorStripe;
