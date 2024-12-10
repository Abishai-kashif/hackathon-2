import React from "react";
import TitleBar from "../title-bar";
import Link from "next/link";
import BlogCard from "../blogCard";

const blogs = [
    {
        image: "/home/blog-1.png",
        title: "Going all-in with millennial design",
        href: "#",
        time: 5,
        date: {
            day: 12,
            month: "Oct",
            year: 2022,
        },
    },
    {
        image: "/home/blog-2.png",
        title: "Going all-in with millennial design",
        href: "#",
        time: 5,
        date: {
            day: 12,
            month: "Oct",
            year: 2022,
        },
    },
    {
        image: "/home/blog-3.png",
        title: "Going all-in with millennial design",
        href: "#",
        time: 5,
        date: {
            day: 12,
            month: "Oct",
            year: 2022,
        },
    },
];

function Blogs() {
    return (
        <section className="wrapper h-auto lg:h-[944px] bg-white flex flex-col justify-center items-center gap-5 py-16">
            <TitleBar
                title="Our Blogs"
                para="Find a bright ideal to suit your taste with our great selection"
            />

            <div className="flex flex-col gap-[30px]">
                <ul
                    className={`grid grid-cols-1 lg:grid-cols-3 gap-[31px] mx-6 place-content-center mt-14`}
                >
                    {blogs.map((blog, idx) => (
                        <li key={idx}>
                            <BlogCard
                                image={blog.image}
                                title={blog.title}
                                href={blog.href}
                                time={blog.time}
                                date={blog.date}
                            />
                        </li>
                    ))}
                </ul>

                <Link
                    href={"#"}
                    className="mx-auto mt-12 underline underline-offset-[22px] decoration-2  text-[20px] font-medium"
                >
                    View All Post
                </Link>
            </div>
        </section>
    );
}

export default Blogs;
