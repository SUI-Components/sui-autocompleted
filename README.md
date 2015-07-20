# SUI-Autocompleted

`sui-autocompleted` is a simple React component to show a list of suggest under a input file, when you start to write something.


## Install

To run from the source and start to play with the examples:

* `$ git clone https://github.com/scm-spain/sui-card`
* `$ cd sui-card`
* `$ npm install`
* `$ npm run dev`
*  Go to _localhost:8080_

## Testing

There is two option the throw the test:

* Single mode: `$ npm test`
* Watch mode: `$ npm run test:watch`


## Design

This component is using the dising of container component ( [more info](https://medium.com/@learnreact/container-components-c0e67432e005) ).

The point is that this component expose the follow props:

* placeholder (String): **Optional** Placeholder value for the input file.
* suggests (Array): **Required** Array of SuggestObjects. Will be the suggests to show. If you want show nothing send a empty array.
* handleChange (Function): **Required** Handle function called when the user change the input field.

	```javascript
		cosnt handleChange = function( string ){ /* String in the input field */ }
	```
* handleSelect (Function): **Required** When the user click over a suggest this function is called with the value of the suggestion.

	```javascript
		const handleSelect = function( value ){ /* selection´s value */ }
	```

and then you have to create containers which one setting that properties in the sui-autocompleted component. You can view an example of this kind of container in the [doc folder](https://github.com/scm-spain/sui-autocompleted/blob/master/docs/autocompleted-container.jsx).

### SuggestObject

An SuggestObject is a plain JS Object with three specials keys:

```javascript
{
    'id': [Unique id for the suggestion],
    'value': [value to be passed at the handleSelect callback]
    'content': [React Component] or [Text to be show in the UI]
}
```

### Theme

There are several class to apply a theme to the component:

* sui-autocompleted
* sui-autocompleted-input
* sui-autocompleted-clear
* sui-autocompleted-results
* sui-autocompleted-item
* sui-autocompleted-item--active

And the component export an basic CSS that you can include from the package in the node_modules.

