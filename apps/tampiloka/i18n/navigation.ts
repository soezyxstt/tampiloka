import { createNavigation } from "next-intl/navigation";
import { routing } from "@/i18n/routing";

const navigation = createNavigation(routing);

export const Link = navigation.Link;
export const usePathname = navigation.usePathname;
export const useRouter = navigation.useRouter;
export const getPathname = navigation.getPathname;

/** Build a localized public URL from one of the app's internal route paths. */
export { localePath, toLocalizedHref } from "@/i18n/routing";
