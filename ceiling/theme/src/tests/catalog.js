import {
  setLastShownView,
  retrieveEntity,
  getEntityRequestInfo,
  catalogRequests
} from "./../actions/catalog";

import {
  REQUEST_CATALOG,
  RETRIEVE_CATEGORY,
  RETRIEVE_PRODUCT,
  RETRIEVE_COLLECTION,
  RETRIEVE_BRAND,
  REFETCH_DATA,
  RETRIEVE_CATALOG,
  SET_FOUND_ENTITIES,
  FIND_ENTITIES,
  CLEAN_SEARCH_ENTITIES,
  SET_LAST_SHOWN_VIEW,
  CATEGORY,
  PRODUCT,
  COLLECTION,
  BRAND,
  CATALOG,
  PRODUCT_SLUG,
} from "./../constants/catalog";

import expect from "expect";
import deepFreeze from "deep-freeze";
import catalog, {initState} from "./../reducers/catalog";

const testSetLastShownView = () => {
  const stateBefore = initState;
  const payload = {
    name: "Awesome item of Awesome View",
    type: "AWESOME_VIEW"
  };
  const stateAfter = {
    ...initState,
    lastShownView: {
      ...payload
    }
  };

  deepFreeze(stateBefore);

  expect(
    catalog(stateBefore, setLastShownView(payload))
  ).toEqual(stateAfter);
};

const testRetrieveEntity = () => {
  const stateBefore = initState;

  const type = RETRIEVE_BRAND;
  const id = "123454321qwertrewq";
  const stateAfter = {
    ...initState,
    "BRAND": id
  };

  deepFreeze(stateBefore);

  expect(
    catalog(stateBefore, retrieveEntity(type, id))
  ).toEqual(stateAfter);
};

const testGetEntityRequestInfo = () => {

  const entityNames = [BRAND, PRODUCT, CATEGORY, COLLECTION, PRODUCT_SLUG];

  entityNames.forEach((entityName) => {
    const expectedResult = catalogRequests[entityName];
    const entityRequestInfo = getEntityRequestInfo(entityName);

    expect(
      entityRequestInfo.name
    ).toEqual(expectedResult.name);

    expect(
      entityRequestInfo.type
    ).toEqual(expectedResult.type);
  });
};

testGetEntityRequestInfo();

testRetrieveEntity();
testSetLastShownView();
