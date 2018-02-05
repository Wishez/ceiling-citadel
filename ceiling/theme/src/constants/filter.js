import React from 'react';
import CatalogItem from './../components/CatalogItem';
import {catalogBrandUrl} from './conf';

export const catalogBrandsCombiner = brands => (
	brands.map((brand, index) => 
		<CatalogItem key={index}
			description={brand.description} 
			name={brand.name} 
			image={brand.image} 
			slug={brand.slug}
			url={catalogBrandUrl}
		/>
	)
)