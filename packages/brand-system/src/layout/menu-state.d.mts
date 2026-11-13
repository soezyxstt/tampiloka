type MenuState = { href: string; mode: "hover" | "pinned" } | null;
export function menuTransition(current: MenuState, href: string, action: "enter" | "leave" | "click"): MenuState;
