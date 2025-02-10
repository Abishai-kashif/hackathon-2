import DetailedCart from "./detailed-cart";

export default function Cart() {
    return (
        <div className="bg-white p-1 sm:p-6 lg:px-20 py-24">
            {/* Cart Section */}
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <DetailedCart />
            </div>
        </div>
    );
}
