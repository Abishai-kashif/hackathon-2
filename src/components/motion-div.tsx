// components/motion.tsx (Framer Motion wrapper)
"use client";

import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MotionDiv(props: any) {
    return <motion.div {...props} />;
}
