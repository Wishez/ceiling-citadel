import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import CatalogItem from '@components/Catalog/CatalogItem';


describe('Catalog Item', () => {
  it('should render correctly', () => {
    const output = shallow(
      <CatalogItem
        name="Тестовая сущность"
        image="/static/images/square.png"
        slug="entity"
        url="/catalog/category/"
        description="Покрывать тестами твоё приложение - это важный процесс для бихнеса. Помни это, пока набиваешь руку. Потом это будет проще, чем сейчас."
      />
    );
    
    expect(shallowToJson(output).toMatchSnapshot());
  });
})
