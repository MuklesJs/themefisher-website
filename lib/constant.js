import config from "@/config/config.json";

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
export const ENV = process.env.NODE_ENV;
export const VENDOR_ID = Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID);
export const VENDOR_AUTH_CODE = process.env.NEXT_PUBLIC_PADDLE_VENDOR_AUTH_CODE;
export const BASE_URL = config.site.base_url;
