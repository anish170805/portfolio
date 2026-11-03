import * as simpleIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const lib = simpleIcons as unknown as Record<string, SimpleIcon | undefined>;

/** Look up a Simple Icons logo by its export name (e.g. "siPython"). Returns undefined if the installed version doesn't ship it. */
export function getBrandIcon(exportName: string): SimpleIcon | undefined {
  return lib[exportName];
}
