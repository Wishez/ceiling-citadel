export const composeClasses = (block, element, modifier, additionalClasses) => {
  const composedClasses = {};

  composedClasses.b = block;

  if (element) {
    composedClasses.el = element;
  }

  if (modifier) {
    composedClasses.m = modifier;
  }

  if (additionalClasses) {
    composedClasses.add = additionalClasses;
  }

  return composedClasses;
};

function getClass({
  b = "",
  el = "",
  m = "",
  add = "",
}) {
  let elementClass = false;

  if (el) {
    elementClass = `${b}__${el}`;
    b = "";
  }

  if (elementClass && m) {
    m = `${elementClass}_${m}`;
  } else if (b && m) {
    m = `${b}_${m}`;
  }

  return [b, elementClass, m, add]
    .filter((filteredClass) => filteredClass)
    .join(" ");
}

export default getClass;
