import DotMatrix from "@/components/dot-matrix";
import Card, { CardGrid } from "@/components/card";
import * as Icon from "@/components/icon";

export default function App() {
  return (
    <div>
      <DotMatrix />
      <CardGrid>
        <Card title="Post 1" description="A example blog post" />
        <Card title="Post 2" description="Another example blog post" />
        <Card title="Post 3" description="Yet another example blog post" />
      </CardGrid>
      <div>
        <p className="text-black dark:text-white">
          I&apos;m a full-stack developer with a passion for building performant
          and scalable web applications. My core expertise lies in Rust,
          TypeScript, and the React framework Next.js. This powerful combination
          allows me to craft robust solutions that deliver exceptional user
          experiences. Beyond my professional work, I&apos;m an avid tech
          enthusiast. I&apos;m fascinated by the potential of self-hosting, the
          flexibility of Linux, the importance of streamlined build tools, and
          the ever-evolving capabilities of Node.js. I believe in the power of
          open-source and continuously exploring new technologies.
        </p>
      </div>
      <div className={`py-12`}>
        {/* <Fade> */}
        <h2 className={`text-3xl font-medium mb-8 flex items-center`}>
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 block`}
          >
            I work with the latest and most advanced
          </span>
        </h2>
        {/* </Fade> */}
        <div
          className={`grid grid-cols-5 gap-5 md:flex md:justify-around md:flex-wrap`}
        >
          <Icon.NextIcon />
          <Icon.TypescriptIcon />
          <Icon.RustIcon />
          <Icon.NodeIcon />
          <Icon.TailwindIcon />
          <Icon.AWSIcon />
          <Icon.BunIcon />
        </div>
      </div>
      <div className={`py-12`}>
        {/* <Fade> */}
        <h2 className={`text-3xl font-medium mb-8 flex items-center`}>
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 block`}
          >
            Recent works
          </span>
        </h2>
        {/* </Fade> */}

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
          {/* <Image
          title="Warrior Academy"
          image={
            <StaticImage
              src="../images/warrior-academy-mockup.png"
              alt="Warrior Academy"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
        <Image
          title="My Financial"
          image={
            <StaticImage
              src="../images/my-financial-mockup.png"
              alt="My Financial"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
          {/* <Image
          title="Warrior Academy Course Platform"
          image={
            // <StaticImage
            //   src="../images/warrior-academy-learning-mockup.png"
            //   alt="Warrior Academy Course Platform"
            //   layout="fullWidth"
            //   placeholder="blurred"
            //   loading="lazy"
            // />
          }
        /> */}
          {/* <Image
          title="Synthetic Analyst"
          image={
            <StaticImage
              src="../images/sa-module-builder-mockup.png"
              alt="Synthetic Analyst"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
          {/* <Image
          title="Compeat"
          image={
            <StaticImage
              src="../images/compeat-mockup.png"
              alt="Compeat"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
          {/* <Image
          title="CAP Map"
          image={
            <StaticImage
              src="../images/cap-map-mockup.png"
              alt="CAP Map"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
          {/* <Image
          title="GMARS Logo"
          image={
            <StaticImage
              src="../images/gmars-logo.png"
              alt="GMARS Logo"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
        </div>
      </div>
    </div>
  );
}
