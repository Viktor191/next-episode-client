import {forwardRef} from "react";
import {Link as RouterLink, LinkProps} from "react-router-dom";

export const CustomLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, "to"> & { to: string }>(
    ({to, ...props}, ref) => <RouterLink ref={ref} to={to} {...props} />
);

CustomLink.displayName = "CustomLink";