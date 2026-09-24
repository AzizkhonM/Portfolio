import { headers } from "next/headers";
import Link from "next/link";

const translations = {
  uz: {
    title: "SAHIFA TOPILMADI.",
    description:
      "Siz izlayotgan sahifa mavjud emas yoki ko‘chirilgan.",
    backHome: "BOSH SAHIFAGA QAYTISH",
  },
  en: {
    title: "PAGE NOT FOUND.",
    description:
      "The page you're looking for doesn't exist or has been moved.",
    backHome: "BACK TO HOME",
  },
  ru: {
    title: "СТРАНИЦА НЕ НАЙДЕНА.",
    description:
      "Страница, которую вы ищете, не существует или была перемещена.",
    backHome: "НА ГЛАВНУЮ",
  },
  ja: {
    title: "ページが見つかりません。",
    description:
      "お探しのページは存在しないか、移動された可能性があります。",
    backHome: "ホームへ戻る",
  },
} as const;

type Locale = keyof typeof translations;

function getLocaleFromPath(pathname: string): Locale {
  const locale = pathname.split("/")[1];

  if (locale === "en" || locale === "ru" || locale === "ja") {
    return locale;
  }

  return "uz";
}

export default async function NotFound() {
  const requestHeaders = await headers();
  const pathname = requestHeaders.get("x-pathname") ?? "/";

  const locale = getLocaleFromPath(pathname);
  const t = translations[locale];

  return (
    <main className="flex min-h-dvh flex-col bg-[#FFFAF0] px-6 py-6 text-[#171411] sm:px-10 sm:py-8 lg:px-16 lg:py-10">
      <header className="flex items-start justify-between border-b border-[#171411]/15 pb-4">
        <span className="font-advaken text-sm tracking-[-0.02em]">
          AZIZKHON
        </span>

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-50">
          404
        </span>
      </header>

      <section className="flex flex-1 flex-col justify-center py-20">
        <p className="mb-6 font-advaken text-[clamp(6rem,20vw,18rem)] leading-[0.75] tracking-[-0.07em]">
          404
        </p>

        <div className="max-w-full">
          <h1 className="font-advaken text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-[-0.045em]">
            {t.title}
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-60 sm:text-base">
            {t.description}
          </p>

          <Link
            href={locale === "uz" ? "/" : `/${locale}`}
            className="mt-10 inline-flex border-b border-[#171411] pb-1 text-[11px] font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
          >
            {t.backHome}
          </Link>
        </div>
      </section>

      <footer className="flex items-end justify-between border-t border-[#171411]/15 pt-4 text-[10px] uppercase tracking-[0.2em] opacity-50">
        <span>SOFTWARE ENGINEER</span>
        <span>TASHKENT, UZBEKISTAN</span>
      </footer>
    </main>
  );
}
