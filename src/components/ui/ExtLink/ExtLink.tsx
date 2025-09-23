import clsx from 'clsx';
import {
  AnchorHTMLAttributes,
  ReactNode,
  Children,
  isValidElement,
} from 'react';

type AlignLink = 'start' | 'center' | 'end';

type ExtLinkProps = {
  children: ReactNode;
  className?: string;
  openInNewTab?: boolean;
  isExternal?: boolean;
  truncate?: boolean;
  alignLink?: AlignLink;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const getTextFromReactNode = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextFromReactNode).join('');
  }

  if (isValidElement(node)) {
    const element = node as unknown as { props?: { children?: ReactNode } };
    const children = element.props?.children;

    return Children.toArray(children).map(getTextFromReactNode).join('');
  }

  return '';
};

const isExternalByScheme = (url: string): boolean =>
  /^(https?:|mailto:|tel:)/i.test(url);

const ExtLink = ({
  children,
  className,
  openInNewTab,
  isExternal,
  truncate,
  title,
  alignLink = 'start',
  rel,
  href,
  target,
  ...rest
}: ExtLinkProps) => {
  const effectiveHref = href ?? '#';
  const resolvedIsExternal =
    typeof isExternal === 'boolean'
      ? isExternal
      : isExternalByScheme(effectiveHref);
  const shouldOpenInNewTab = Boolean(openInNewTab || resolvedIsExternal);

  const position = {
    start: 'md:justify-start',
    center: 'md:justify-center',
    end: 'md:justify-end',
  };

  const computedTitle =
    title ?? (truncate ? getTextFromReactNode(children) : undefined);

  const relBase = shouldOpenInNewTab ? 'noopener noreferrer' : '';
  const mergedRel =
    Array.from(
      new Set(`${relBase} ${rel ?? ''}`.trim().split(/\s+/).filter(Boolean))
    ).join(' ') || undefined;

  const finalTarget = shouldOpenInNewTab ? '_blank' : target;

  const externalIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-1 inline-block h-4 w-4 opacity-80 md:hidden"
      aria-hidden
      focusable={false}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );

  return (
    <a
      className={clsx(
        'flex items-baseline cursor-pointer md:hover:underline md:hover:font-bold md:hover:text-hovered transition',
        position[alignLink],
        className
      )}
      href={effectiveHref}
      target={finalTarget}
      rel={mergedRel}
      title={computedTitle}
      {...rest}
    >
      {children}
      {resolvedIsExternal ? externalIcon : null}
    </a>
  );
};

export default ExtLink;
