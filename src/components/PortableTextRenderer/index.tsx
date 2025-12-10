import React from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

export interface PortableTextRendererProps
  extends React.ComponentPropsWithoutRef<"div"> {
  value?: any;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="body-default text-primary/80 mb-4 last:mb-0">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-xl sm:text-2xl text-primary mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-lg sm:text-xl text-primary mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading text-base sm:text-lg text-primary mt-4 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary/20 pl-5 py-2 my-6 text-primary/70 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="body-default text-primary/80 list-disc space-y-2 pl-5 mb-4 last:mb-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="body-default text-primary/80 list-decimal space-y-2 pl-5 mb-4 last:mb-0">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href || "#";
      const blank = (value as { blank?: boolean })?.blank;

      return (
        <a
          href={href}
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
          className="text-accent-primary underline-offset-2 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({
  value,
  className = "space-y-4",
  ...props
}) => {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className={className} {...props}>
      <PortableText value={value} components={components} />
    </div>
  );
};

export default PortableTextRenderer;
