function Footer() {
    return (
        <footer className="wrapper px-2 sm:px-20 h-auto lg:h-[555px]  bg-white overflow-x-hidden">
            <div className="mx-10 mt-20 mb-10 flex flex-col lg:flex-row gap-[136px]">
                {/* <!-- Address Section --> */}
                <div className="flex justify-center flex-col text-[16px] text-gray">
                    <p className="sm:max-w-[290px]">
                        400 University Drive Suite 200 Coral Gables,
                    </p>
                    <p>FL 33134 USA</p>
                </div>

                <div className="flex flex-col md:flex-row gap-[72px]">
                    <div className="flex flex-col sm:flex-row gap-[144px]">
                        <div className="mx-auto text-center sm:mx-0 sm:text-start">
                            <h4 className="text-[16px] font-medium text-gray mb-[55px]">
                                Links
                            </h4>
                            <ul className="space-y-[55px] text-[16px] font-medium">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Shop
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* <!-- Help Section --> */}
                        <div className="mx-auto text-center sm:mx-0 sm:text-start">
                            <h4 className="text-[16px] font-medium text-gray mb-[55px]">
                                Help
                            </h4>
                            <ul className="space-y-[55px] text-[16px] font-medium">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Payment Options
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Returns
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Privacy Policies
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* <!-- Newsletter Section --> */}
                    <div>
                        <h4 className="text-[16px] font-medium text-gray mb-[50px]">
                            Newsletter
                        </h4>
                        <form className="flex flex-col sm:flex-row items-center justify-center gap-y-4 gap-x-2">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="flex-1 py-1 border-b-2 border-black  focus:outline-none placeholder:text-[14px] placeholder:text-gray"
                            />
                            <button
                                type="submit"
                                className="pt-1.5 py-1 text-black bg-transparent  border-b-2 border-black  hover:text-gray text-[14px] font-medium uppercase"
                            >
                                SUBSCRIBE
                            </button>
                        </form>
                    </div>
                </div>
                {/* <!-- Links Section --> */}
            </div>

            {/* <!-- Footer Bottom --> */}
            <div className="border-t border-light-gray mt-6 pt-8 sm:pt-12">
                <p className="mb-6 sm:mb-0">
                    2022 Meubel House. All rights reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;
