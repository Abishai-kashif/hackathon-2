import { toast } from "react-hot-toast";

function CartToasterMessage({ name, quantity }: IProps) {
    return (
        <div>
            <p className="text-[17px]">
                Cart updated: <span className="font-semibold">{name}</span> now
                has{" "}
                <span className="font-semibold text-[#B88E2F]">{quantity}</span>{" "}
                item(s).
            </p>
            <div className="mt-2 flex justify-end">
                <button
                    onClick={() => toast.dismiss()}
                    className="bg-transparent text-black underline underline-offset-[7px] decoration-2 text-[15px] font-medium mt-2"
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
}

interface IProps {
    name: string;
    quantity: number;
}

export default CartToasterMessage;
