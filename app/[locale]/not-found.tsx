import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="flex min-h-dvh flex-col bg-[#FFFAF0] px-6 py-6 text-[#171411] sm:px-10 sm:py-8 lg:px-16 lg:py-10">
      <header className="flex items-start justify-between border-b border-[#171411]/15 pb-4">
        <span className="font-advaken text-sm tracking-[-0.02em]">
          ALEX
        </span>

        <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-50">
          {t("code")}
        </span>
      </header>

      <section className="flex flex-1 flex-col justify-center py-20">
        <p className="mb-6 font-advaken text-[clamp(6rem,20vw,18rem)] leading-[0.75] tracking-[-0.07em]">
          {t("code")}
        </p>

        <div className="max-w-2xl">
          <h1 className="font-advaken text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] tracking-[-0.045em]">
            {t("title")}
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed opacity-60 sm:text-base">
            {t("description")}
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex border-b border-[#171411] pb-1 text-[11px] font-semibold uppercase tracking-[0.15em] transition-opacity hover:opacity-50"
          >
            {t("backHome")}
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
