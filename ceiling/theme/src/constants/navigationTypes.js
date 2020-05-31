export const SELECT_NAVIGATION_ITEM = "SELECT_NAVIGATION_ITEM";
export const CLEAN_ACTIVE_STATE = "CLEAN_ACTIVE_STATE";
export const CLOSE_MENU = "CLOSE_MENU";
export const OPEN_MENU = "OPEN_MENU";

function combineItem(firstPart, secondPart, thirdPart) {
  const firstPartHtml = `<span class="navItem__refer_darkBlue">${firstPart}</span>`;
  const secondPartHtml = `<span class="navItem__refer_orange">${secondPart}</span>`;
  const thirdPartHtml = thirdPart ? `<span class="navItem__refer_cian">${thirdPart}</span>` : "";

  return `${firstPartHtml}${secondPartHtml}${thirdPartHtml}`;
}
export const navigationItems = {
  home: combineItem("Глав", "ная"),
  catalog: combineItem("Ката", "лог"),
  contacts: combineItem("Кон", "так", "ты"),
  service: combineItem("Сер", "вис"),
};
