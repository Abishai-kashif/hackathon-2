import Cart from "@/components/cart";

function CartPage() {
    return (
        <main className="wrapper">
            <div className="bg-white p-1 sm:p-6 lg:px-20 py-24">
                <div className="flex flex-col lg:flex-row justify-between gap-8"></div>
            </div>
            <Cart />
        </main>
    );
}

export default CartPage;
