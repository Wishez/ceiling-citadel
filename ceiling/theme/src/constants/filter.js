import React from 'react';
import CatalogItem from './../components/CatalogItem';
import {catalogBrandUrl} from './conf';

export const catalogBrandsCombiner = brands => (
	brands.map((brand, index) => 
		<CatalogItem key={index}
			description={brand.description} 
			name={brand.name} 
			image={brand.preview.image} 
			slug={brand.slug}
			style={brands.length - 1 === index ? 
						"center" :
						index % 2 === 0 ? 
							"right" : 
							"left"}
			url={catalogBrandUrl}
		/>
	)
)