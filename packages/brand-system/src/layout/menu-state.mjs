export function menuTransition(current, href, action) {
  if (action === "enter") return current?.href === href && current.mode === "pinned" ? current : { href, mode: "hover" };
  if (action === "leave") return current?.href === href && current.mode === "hover" ? null : current;
  return current?.href === href && current.mode === "pinned" ? null : { href, mode: "pinned" };
}
