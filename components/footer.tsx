import * as React from "react";
import Link from "next/link";
import { meta } from "@/lib/meta";
import { GithubIcon, XIcon } from "@/components/social-icons";
import { RssIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
          aria-label="Footer"
        >
          {meta.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a
                href={item.href}
                className="text-sm leading-6 text-gray-600 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          <Link
            href={meta.social.github.href}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">{meta.social.github.name}</span>
            <GithubIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link
            href={meta.social.x.href}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">{meta.social.x.name}</span>
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
          <Link
            href={meta.social.rss.href}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">{meta.social.rss.name}</span>
            <RssIcon className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} {meta.title}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
