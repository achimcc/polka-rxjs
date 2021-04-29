import React from 'react';
import { useDispatch } from 'react-redux';

const Instantiate = () => {
	const dispatch = useDispatch();
	const onInstantiate = () => dispatch({ type: 'Connect' });
	return (
		<>
			<button onClick={onInstantiate}>Instantiate</button>
		</>
	);
};

export default Instantiate;
