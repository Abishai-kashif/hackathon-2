import React from "react";

function TitleBar({ title, para }: { title: string; para?: string }) {
    return (
        <div className="w-full text-center flex flex-col gap-[13px]">
            <h2 className="text-[36px] font-medium">{title}</h2>

            {para && (
                <p className="text-[16px] font-medium text-gray">{para}</p>
            )}
        </div>
    );
}

export default TitleBar;
