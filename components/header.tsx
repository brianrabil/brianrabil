import React from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import cn from "clsx";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Header() {
  return (
    <header className={`w-screen bg-white dark:bg-black `}>
      <Container className="py-5 flex items-center justify-between">
        <Link
          href="/"
          className={`text-lg text-black dark:text-white flex items-center gap-x-2`}
        >
          <Avatar>
            <AvatarFallback>BR</AvatarFallback>
          </Avatar>
          <span className="font-medium">Brian Rabil</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                        style={{
                          backgroundImage: `url("images/IMG_2056.jpeg")`,
                          backgroundSize: "cover",
                          backgroundPosition: "bottom",
                          backgroundRepeat: "no-repeat",
                        }}
                      >
                        {/* <Icons.logo className="h-6 w-6" /> */}
                        <div className="mb-2 mt-4 text-white text-lg font-medium">
                          Brian Rabil
                        </div>
                        <p className="text-sm leading-tight text-white text-muted-foreground">
                          UX Engineer
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Biography">
                    My story and philosophy
                  </ListItem>

                  <ListItem href="/docs/primitives/typography" title="Resume">
                    Explore my work experience
                  </ListItem>
                  <ListItem
                    href="/docs/installation"
                    title="Chat with AI Clone"
                  >
                    Get help with your project
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div></div>
      </Container>
      <Container>
        <Separator />
      </Container>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
