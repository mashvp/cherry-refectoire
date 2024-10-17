'use client';
import { useRouter } from "next/navigation";
import React from "react";

import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import { useTransitionfunction } from "@/library/navigation/TransitionElement";
import * as prismic from "@prismicio/client";

export const AnimLink = React.forwardRef<HTMLAnchorElement, PrismicNextLinkProps>(
function AnimLink({ field, document, linkResolver, ...restProps },ref,): JSX.Element | null {
	const {
		href: computedHref,
		rel: computedRel,
		...attrs
	} = prismic.asLinkAttrs(field ?? document, {
		linkResolver,
		rel: typeof restProps.rel === "function" ? restProps.rel : undefined,
	});
  
	const href = ("href" in restProps ? restProps.href : computedHref) || "";

	let rel = computedRel;
	if ("rel" in restProps && typeof restProps.rel !== "function") {
		rel = restProps.rel;
	}

  const router = useRouter();
  const {fn} = useTransitionfunction();

  const handleClick = (e:any) => {
    e.preventDefault();
    fn();
    router.prefetch(href as string);
    setTimeout(()=>{
      router.push(href as string);
    },200)
  }

	return <PrismicNextLink ref={ref} {...attrs} {...restProps} onClick={handleClick} href={href} rel={rel} />;
});