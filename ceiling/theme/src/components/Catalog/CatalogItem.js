import React  from "react";
import Image from "pimg";
import getClass from "./../../constants/classes";
import Table from "./Table";
import Figure from "./../Figure";
import Description from "./Description";
import Characteristics from "./Characteristics";

import { slideTo, timeout } from "./../../constants/pureFunctions";

const CatalogItem = ({
  modifier,
  className,
  name,
  tablePosition = "stretch",
  image,
  description,
  style,
  slug,
  url,
  isSample,
  item,
  changePage,
}) => (
  <article
    className={
      getClass({
        b: "catalogItem",
        m: modifier,
        add: `${className || ""}${style ? ` catalogItem_${style}` : ""} parent row h-start v-end`,
      })
    }
  >
    <span role="presentation" className="catalogItemContent fullWidth index_big margin-bottom_zero">
      <Table
        url={url}
        slug={slug}
        content={name}
        modifier={tablePosition}
        isNotRoute={isSample}
        onClick={changePage}
      />
      {isSample ?
        <Characteristics url={`${url}${slug}/`} {...item} /> :
        <Description changePage={changePage} url={`${url}${slug}/`} content={description} />}
    </span>
    <Image
      fetchOnDemand
      src={image}
      className={`catalogItem__image lazy  image ${isSample ? "catalogItem__image_sample" : "catalogItem__image_preview"}`}
      alt=""
      style={{
        maxWidth: 190,
      }}
      onLoad={(event) => {
        event.target.classList.add("fadeIn");
      }}
    />
  </article>
);

export default CatalogItem;
