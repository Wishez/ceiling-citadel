import React  from "react";
import getClass from "@/constants/classes";
import { Link } from "react-router-dom";
import Characteristic from "./Characteristic";

const Characteristics = ({
  width,
  height,
  thickness,
  length,
  step_between_panels,
  angle_of_bend,
  diameter,
  ceil_size,
  brand,
  colors,
  modifier = "",
  className,
  name,
  url,
  children,
}) => (
  <article className={
    getClass({
      b: "characteristics",
      m: modifier,
      add: `${className} parent column h-start v-start paragraph_container itemPresentation`,
    })
  }
  >
    <h4 className={getClass({ b: "visible-hidden" })}>
      {`Характеристики ${name}`}
    </h4>

    {brand ?
      <Characteristic name="brand" value={brand} label="Производитель" />
      : ""}

    {width ?
      <Characteristic name="width" value={width} label="Ширина" />
      : ""}

    {length ?
      <Characteristic name="length" value={length} label="Длина" />
      : ""}

    {diameter ?
      <Characteristic name="diameter" value={diameter} label="Диаметр окружности" />
      : ""}

    {ceil_size ?
      <Characteristic name="ceil_size" value={ceil_size} label="Размер ячеек" />
      : ""}

    {height ?
      <Characteristic name="height" value={height} label="Высота" />
      : ""}

    {thickness ?
      <Characteristic name="thickness" value={thickness} label="Толщина" />
      : ""}

    {step_between_panels ?
      <Characteristic name="step_between_panels" value={step_between_panels} label="Шаг между панелями" />
      : ""}

    {angle_of_bend ?
      <Characteristic name="angle_of_bend" value={`${angle_of_bend}°`} label="Мин. угол загиба" />
      : ""}

    {(typeof colors === "object" && colors.length) ?
      <Characteristic name="colors" label="Цвета">
        <div className="colors parent row h-end">
          {colors.reverse().slice(0, 9).map((color, index) => (
            <div key={index} className="colorContainer parent column">
              <span style={{ backgroundColor: color.color }} className="colorContainer__color" />
              <span className="colorContainer__name visible-hidden">{color.name}</span>
            </div>
          ))}
        </div>
      </Characteristic>
      : ""}

    {typeof colors === "string" ?
      <Characteristic name="" label="Цвет" value={colors} />
      : ""}

    {children}

    {url ?
      <div className={getClass({
        b: "moreRefer",
        m: modifier,
        add: "parent row centered zeroVerticalMargin",
      })}
      >
        <Link to={url} >
          Подробнее
        </Link>
      </div>
      : ""}
  </article>

);

export default Characteristics;
