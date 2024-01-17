export function createIconify(iconName) {
  const icon = document.createElement("span");
  icon.classList.add("iconify");
  icon.dataset.icon = iconName;

  return icon;
}

export function createIconAdd() {
  return createIconify("mingcute:add-fill");
};

export function createIconEdit() {
  return createIconify("akar-icons:edit");
};

export function createIconDelete() {
  return createIconify("material-symbols:delete-outline");
};
