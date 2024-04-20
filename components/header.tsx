"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import cn from "clsx";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { meta } from "@/lib/meta";

export default function Header() {
  return (
    <header
      className={`w-screen overflow-y-hidden sticky top-0 bg-white/90 dark:bg-black z-20 backdrop-blur-sm dark:backdrop-blur-sm-lg backdrop-filter backdrop-saturate-150 dark:backdrop-saturate-150  transition-all duration-200`}
    >
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
            {meta.main.map((item) => (
              <NavigationMenuItem key={item.name}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
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
