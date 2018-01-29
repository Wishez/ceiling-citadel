import React from 'react';
import { Input } from 'semantic-ui-react';


const RenderController = ({
	input,
	meta: {
		touched,
		error,
		warning
	},
	block,
	label,
	modifier,
	style,
	...rest
}) => (
	<div style={style ? style : {}} 
		className={`${block} ${modifier ? [block, modifier].join('_') : ''}`}>
		<label className={`${block}__label`}>{label}</label>
		<Input {...input}
			{...rest}
			className={`${block}__input`} /> 
			
		 {touched && 
		 	((error && 
		 		<span className={`${block}__error formError`}>{error}</span>) || 
		 		(warning && <span className={`${block}__error`}>{warning}</span>))}

	</div>
);

export default RenderController;