export function createIconify(iconName) {
  const icon = document.createElement("span");
  icon.classList.add("iconify");
  icon.dataset.icon = iconName;

  return icon;
}
