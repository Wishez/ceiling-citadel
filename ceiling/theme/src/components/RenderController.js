import React from 'react';
import getClass, { composeClasses } from './../constants/classes';
import Figure from './Figure';
import _styles  from './../index.sass';

const RenderController = ({
	input,
	meta: {
		touched,
		error,
		warning
	},
	block="controller",
	label,
	modifier="",
	style,
	iconOptions,
	className,
	...rest
}) => (
	<div style={style ? style : {}} 
		className={getClass({
			b: block,
			m: modifier,
			add: className
		})}>
			{label ? 
				<label className={getClass({
					b: block,
					el: "label",
					m: modifier
				})}>
					{label}
				</label> : ''}
			{iconOptions ? 
				<Figure 
					block="controllerIcon" 
					{...iconOptions} 
				/> : ''
			}
			<input {...input}
				{...rest}
				className={getClass({
					b: block,
					el: "input",
					m: modifier
				})} 
			/> 
			
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

export default RenderController;