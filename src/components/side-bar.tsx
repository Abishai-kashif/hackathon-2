import React from "react";
import RecentPost from "./recent-post";

const categories = [
    { name: "Crafts", numberOfPosts: 2 },
    { name: "Design", numberOfPosts: 8 },
    { name: "Handmade", numberOfPosts: 7 },
    { name: "Interior", numberOfPosts: 1 },
    { name: "Wood", numberOfPosts: 6 },
];
const recentPosts = [
    {
        image: "/recent-posts/rp-1.jpg",
        title: "Going all-in with millennial design",
        date: "03 Aug 2022",
    },
    {
        image: "/recent-posts/rp-2.jpg",
        title: "Exploring new ways of decorating",
        date: "03 Aug 2022",
    },
    {
        image: "/recent-posts/rp-3.jpg",
        title: "Handmade pieces that took time to make",
        date: "03 Aug 2022",
    },
    {
        image: "/recent-posts/rp-4.jpg",
        title: "Modern home in Milan",
        date: "03 Aug 2022",
    },
    {
        image: "/recent-posts/rp-5.jpg",
        title: "Colorful office redesign",
        date: "03 Aug 2022",
    },
];

function SideBar() {
    return (
        <aside>
            <div className="w-4/5 sm:w-[251px] mx-auto mt-11 mb-32">
                <h3 className="font-medium text-[24px] text-black">
                    Categories
                </h3>
                <ul>
                    {categories.map((category, idx) => (
                        <li
                            key={idx}
                            className="w-full flex items-center justify-between font-normal text-[16px] text-gray mt-9"
                        >
                            <span>{category.name}</span>
                            <span>{category.numberOfPosts}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full">
                <div className="max-w-[252px] mx-auto">
                    <h3 className="font-medium text-[24px] text-black mb-8">
                        Recent Posts
                    </h3>
                    <ul className="space-y-10">
                        {recentPosts.map((post, idx) => (
                            <li key={idx}>
                                <RecentPost
                                    image={post.image}
                                    title={post.title}
                                    date={post.date}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </aside>
    );
}

export default SideBar;
