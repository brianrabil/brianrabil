import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <>
      {/* <SEO title="Page two" /> */}
      <div className="py-12 md:pt-24 md:pb-12">
        <div className={`max-w-2xl mx-auto`}>
          <h4 className={`text-2xl font-medium mb-3 flex items-center`}>
            <span>👋 &nbsp;</span>
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 block`}
            >
              Hello!
            </span>
          </h4>
          <h2 className={`text-xl text-black dark:text-white leading-loose`}>
            <p className={`mb-5`}>
              My name is Brian Rabil, and I am UI/UX engineer based in
              Washington D.C. with over 5 years of experience in designing,
              planning, and developing digital user interfaces and user
              experiences. Over the course of my career, I have enjoyed the
              privilege of working with some of the world&apos;s most recognized
              brands.
            </p>
            <p className={`mb-5`}>
              Currently, I work for Schema Driven, a startup that provides
              enterprise-level automation software. As the lead UX Architect, I
              work closely with the engineering team to design and build
              powerful &amp; easy-to-use low-code tooling.
            </p>
            <p className={`mb-5`}>
              When I&apos;m not busy working on my various projects, I like to
              enjoy some well-deserved leisure time by reading books and
              watching low-grade reality TV with my wife and Yorkie puppy.
            </p>
            <p className={`mb-5`}>
              If you need an app developer for your next project, please
              don&apos;t hesitate to get in touch. I live for the days spent
              solving problems with technology - it&apos;s my passion.
            </p>
          </h2>
        </div>
      </div>
      <Link href="/">Go back to the homepage</Link>
    </>
  );
}
