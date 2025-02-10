import LoginForm from "./login-form";
import RegisterForm from "./register-form";

export default function AuthForm() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-50 sm:p-6 xl:p-10 gap-24">
            {/* Log In Section */}
            <div className="sm:max-w-[608px] mt-10 lg:mt-0 sm:pr-10 px-3 sm:px-0 lg:pl-5 py-9 h-[630px] w-full">
                <h2 className="text-[36px] font-semibold mb-7">Log In</h2>
                <LoginForm />
            </div>

            {/* Register Section */}
            <div className="sm:max-w-[608px] sm:pr-10 px-3 sm:px-0 lg:pl-5 py-9 h-[630px] w-full">
                <h2 className="text-[36px] font-semibold mb-7">Register</h2>
                <RegisterForm />
            </div>
        </div>
    );
}
