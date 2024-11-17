import type {NextConfig} from "next";
import {config} from "dotenv";
config();

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    }
};

export default nextConfig;
