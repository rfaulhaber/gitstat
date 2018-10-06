import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Main } from './containers';
import reducers from './reducers';

const store = createStore(reducers, applyMiddleware(thunk));

store.subscribe(() => {
	console.log('state changed', store.getState());
});

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Main />
			</Provider>
		);
	}
}

export default App;
