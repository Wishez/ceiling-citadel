import React from 'react';
import getClass from './../../constants/classes';
import {reduxForm} from 'redux-form';
import Form from './../Form';
import envelope from './../../images/icons/envelope.png';
import user from './../../images/icons/user.png';
import message from './../../images/icons/message.png';

import combustibilityIcon from './../../images/icons/fire.png';
import acousticsIcon from './../../images/icons/sound.png';
import lightningIcon from './../../images/icons/lightning.png';
import edgesIcon from './../../images/icons/rope.png';
import colorsIcon from './../../images/icons/palette.png';
import materialIcon from './../../images/icons/material.png';
import widthIcon from './../../images/icons/width.png';
import heightIcon from './../../images/icons/height.png';
import thicknessIcon from './../../images/icons/thickness.png';
import lengthIcon from './../../images/icons/length.png';

import SelectController from './../Controllers/SelectController';
import {
	required
} from './../../constants/validation';

const AddProductForm = ({
	helpText,
	combustibility,
	acoustics,
	edges,
	colors,
	material,
	lightning,
	width,
	height,
	thickness,
	length,
	combustibilityValue,
    acousticsValue,
    edgesValue,
    colorsValue,
    materialValue,
    lightningValue,
    onChangeSelect,
	...rest
}) => (
	<Form fields={[
		{
			name: "combustibility",
			placeholder: "Горючесть",
			label: "Горючесть",
			modifier: "whiteBg",
			iconOptions: {
				url: combustibilityIcon,
				maxWidth: 35,
				name: "combustibility"
			},
			options: combustibility,
			className:"parent row h-around",
			component: SelectController,
			isShown: combustibility.length,
			value: combustibilityValue,
			hintText: 'Огнеупорная',
			onChangeSelect
		},
		{
			name: "lightning",
			placeholder: "Освящение",
			label: "Освящение",
			modifier: "whiteBg",
			hintText: 'Освященное',
			iconOptions: {
				url: lightningIcon,
				maxWidth: 35,
				name: "lightning"
			},
			options: lightning,
			className:"parent row h-around",
			component: SelectController,
			isShown: lightning.length,
			value: lightningValue,
			onChangeSelect,

		},
		{
			name: "acoustics",
			placeholder: "Акустика",
			label: "Акустика",
			modifier: "whiteBg",
			iconOptions: {
				url: acousticsIcon,
				maxWidth: 35,
				name: "acoustics"
			},
			options: acoustics,
			className:"parent row h-around",
			component: SelectController,
			isShown: acoustics.length,
			value: acousticsValue,
			onChangeSelect,
			hintText: 'Шумополглащающая',
		},
		{
			name: "edges",
			placeholder: "Кромки",
			label: "Кромки",
			modifier: "whiteBg",
			iconOptions: {
				url: edgesIcon,
				maxWidth: 35,
				name: "edges"
			},
			options: edges,
			className:"parent row h-around",
			component: SelectController,
			isShown: edges.length,
			value: edgesValue,
			hintText: 'Криволинейные',
			onChangeSelect
		},
		{
			name: "material",
			placeholder: "Материал",
			label: "Материал",
			modifier: "whiteBg",
			iconOptions: {
				url: materialIcon,
				maxWidth: 35,
				name: "material"
			},
			options: material,
			className:"parent row h-around",
			component: SelectController,
			isShown: material.length,
			value: materialValue,
			onChangeSelect,
			hintText: 'Алюминий',
		},
		{
			name: "colors",
			placeholder: "Цвета",
			label: "Цвета",
			modifier: "whiteBg",
			iconOptions: {
				url: colorsIcon,
				maxWidth: 35,
				name: "colors"
			},
			options: colors,
			className:"parent row h-around",
			component: SelectController,
			isShown: colors.length,
			value: colorsValue,
			onChangeSelect,
			hintText: 'Серебряный',
		},
		{
			type: "text",
			maxLength: 10,
			minLength: 1,
			name: "width",
			modifier: 'small',
			validate: [required],
			placeholder: "20мм",
			label: "Ширина",
			iconOptions: {
				url: widthIcon,
				maxWidth: 35,
				name: 'width'
			},
			className:"parent row h-around",
			asideText: width 
		},
		{
			type: "text",
			maxLength: 10,
			minLength: 1,
			name: "height",
			modifier: 'small',
			validate: [required],
			placeholder: "7.999мм",
			label: "Высота",
			iconOptions: {
				url: heightIcon,
				maxWidth: 35,
				name: 'height'
			},
			className:"parent row h-around",
			asideText: height 
		},
		{
			type: "text",
			maxLength: 10,
			minLength: 1,
			name: "thickness",
			modifier: 'small',
			validate: [required],
			placeholder: "1.499мм",
			label: "Толщина",
			iconOptions: {
				url: thicknessIcon,
				maxWidth: 35,
				name: 'thickness'
			},
			className:"parent row h-around",
			asideText: thickness 
		},
		{
			type: "text",
			maxLength: 10,
			minLength: 1,
			name: "length",
			validate: [required],
			placeholder: "5м",
			label: "Длина",
			modifier: "small",
			iconOptions: {
				url: lengthIcon,
				maxWidth: 35,
				name: 'length'
			},
			className:"parent row h-around",
			asideText: length 
		},

		
	]}  
	serverError={helpText}
	{...rest}>
	</Form>
);


export default reduxForm({
	form: "addProductForm"
})(AddProductForm);