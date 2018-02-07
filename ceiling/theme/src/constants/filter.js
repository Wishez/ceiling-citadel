import React from 'react';
import CatalogItem from './../components/Catalog/CatalogItem';
import {catalogBrandUrl, catalogCategoryUrl} from './conf';
import {getArray} from './pureFunctions';
import  CatalogSubsection from './../components/Catalog/CatalogSubsection';


export const catalogItemsCombiner = (items, url) => (
	items.map((item, index) => {
		const name = item.name;
		const slug = item.slug;

		return <CatalogItem key={index}
			description={item.description} 
			name={name} item
			image={item.preview.image} 
			slug={slug}
			style={items.length - 1 === index ? 
						"center" :
						index % 2 === 0 ? 
							"right" : 
							"left"}
			url={url}
		/>;
	})
);


export const catalogCategoriesCombiner = (categories) => {
	const subsections = {};

	// Generate subsections of section.
	categories
		.forEach((category, index) => {
			const subsection = category.section;
			const slug = category.slug;
			const name = category.name;
			// Create object or go next
			
			if (!(subsection in subsections)) {
				subsections[subsection] = {
					name: subsection,
					items: [],
					headerId: slug
				};
			}
			// Cache
			const newSubsection = subsections[subsection];
			// Will push to newSection's items;
			const items = [];
			// Combine items.
			items.push(
				<CatalogItem key={index}
					description={category.description} 
					name={name} 
					image={category.preview.image} 
					slug={slug}
					style={category.length - 1 === index ? 
								"center" :
								index % 2 === 0 ? 
									"right" : 
									"left"}
					url={catalogCategoryUrl} 
				/>
			); // end push
				
		 	newSubsection.items = items;


	});


	return getArray(subsections).map((subsection, index) => 
			<CatalogSubsection key={index} {...subsection}>
				{subsection.items}
			</CatalogSubsection>
		);
};