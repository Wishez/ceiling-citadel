import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getClass from './../../constants/classes';
import Figure from './../Figure';
import ActionLabel from 'material-ui/svg-icons/av/stop';
import ReactHtmlParser from 'react-html-parser';

const SelectController = ({
	input,
	meta: {
		touched,
		error,
		warning
	},
	block='controller',
	options,
	onChangeSelect,
	modifier,
	label,
	className,
	iconOptions,
	style,
	hintText,
	...rest
}) => (
	<div style={style ? style : {}} 
		className={getClass({
			b: block,
			m: modifier,
			add: `${className}`
		})}>
		{label ? 
				<label className={getClass({
					b: block,
					el: "label",
					m: modifier,
					add: "baseChild"
				})}>
					{label}
				</label> : ''}
		{iconOptions ? 
			<Figure 
				block="controllerIcon" 
				className="baseChild"
				{...iconOptions} 
			/> : ''
		}
		<SelectField {...input}
			className={getClass({b: "controller", el: "input", m: "select"})}
			onChange={onChangeSelect(input)}
			hintText={hintText}
			value={input.value}
			
		>
			{options.map((option, index) => (
	 			<MenuItem className={getClass({
	 				b: "controller", 
	 				el: "option", 
	 				m: modifier}
	 			)}
	 				key={index} 
	 				value={option.value} 
	 				primaryText={option.text}
	 				leftIcon={
	 					"showIcon" in option  ? 
	 						<ActionLabel color={option.color} /> : false}
	 			/>
			))}
		</SelectField>
		{touched && 
		 	((error && 
		 		<span className={getClass({
					b: block,
					el: "error"
				})}>{error}</span>) || 
		 		(warning && <span className={getClass({
					b: block,
					el: "error"
				})}>{warning}</span>))}
	</div>
);


export default SelectController;