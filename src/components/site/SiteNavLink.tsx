"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type SiteNavLinkProps = Omit<ComponentProps<typeof Link>, "aria-current">;

function hrefToString(href: SiteNavLinkProps["href"]): string {
  if (typeof href === "string") {
    return href;
  }
  const path = href.pathname ?? "";
  const hash = href.hash ?? "";
  return `${path}${hash}`;
}

function pathFromHref(href: string): string {
  const withoutHash = href.split("#")[0] ?? "";
  return withoutHash === "" ? "/" : withoutHash;
}

export function SiteNavLink({ href, scroll, ...props }: SiteNavLinkProps) {
  const pathname = usePathname();
  const hrefValue = hrefToString(href);
  const isHashLink = hrefValue.includes("#");
  const linkPath = pathFromHref(hrefValue);
  const isCurrent = !isHashLink && linkPath === pathname;

  return (
    <Link
      href={href}
      scroll={isHashLink ? false : scroll}
      {...props}
      aria-current={isCurrent ? "page" : undefined}
    />
  );
}
