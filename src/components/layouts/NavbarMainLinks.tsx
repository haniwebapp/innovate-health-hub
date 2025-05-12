
import { MainNavLinks } from "./navigation/MainNavLinks";

interface NavbarMainLinksProps {
  isRouteActive: (path: string) => boolean;
}

export function NavbarMainLinks({ isRouteActive }: NavbarMainLinksProps) {
  return <MainNavLinks isRouteActive={isRouteActive} />;
}
