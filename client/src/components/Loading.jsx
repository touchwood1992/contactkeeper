import React from 'react';
import loadImg from '../loading.gif';
const Loading = () => {
	return (
		<div className='loaderContainer'>
			<img src={loadImg} alt='Loading...' />
		</div>
	);
};
export default Loading;
