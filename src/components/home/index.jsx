import { h } from 'preact';

import style from './style.scss';

import { MbButton } from 'preact-mamba-websdk';


export default () => {
	return (
		<div class={style.home}>
			<h1>Home</h1>
			<a href="#page1">Page 1</a>
			<a href="#page2">Page 2</a>
			<a href="#page3">Page 3</a>
			<a href="#page4">Page 4</a>
			<MbButton mbText="Mamba Button" clickHandler={() => {alert('mamba');}}/>
		</div>
	);
};
