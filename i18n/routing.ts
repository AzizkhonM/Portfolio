import {defineRouting} from "next-intl/routing";
import {createNavigation} from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["uz", "en", "ru", "ja"],
  defaultLocale: "uz",
  localePrefix: "as-needed",
  localeDetection: false,
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
