# SUI-Autocompleted

`sui-autocompleted` is a simple React component that shows a list of suggestions under an input file when you start to write something.


## Install

In order of running the source code and start to play with the examples:

* `$ git clone https://github.com/scm-spain/sui-card`
* `$ cd sui-card`
* `$ npm install`
* `$ npm run dev`
*  Go to _localhost:8080_

## Testing

There are two options for executing tests:

* Single mode: `$ npm test`
* Watch mode: `$ npm run test:watch`


## Design

The design used is the container component one ( [more info](https://medium.com/@learnreact/container-components-c0e67432e005) ).

The component exposes the following props:

* placeholder (String): **Optional** Default text value for the input file when no key is pressed (placeholder value).
* suggests (Array): **Required** Array of SuggestionObjects. Te array contains the suggestions to show. If you don't want to show anything you have to send an empty array.
* handleChange (Function): **Required** This function is called everytime user change the input field value.

	```javascript
		const handleChange = function( inputFileValue ){ ... }
	```
* handleSelect (Function): **Required** This function is called when one suggestion is selected (via click or enter pressed).

	```javascript
		const handleSelect = function( suggestionValue ){ ... }
	```

and then you have to create containers which one setting that properties in the sui-autocompleted component. You can view an example of this kind of container in the [doc folder](https://github.com/scm-spain/sui-autocompleted/blob/master/docs/autocompleted-container.jsx).

### SuggestObject

An SuggestObject is a plain JS Object with these specials keys:

```javascript
{
    'id': [Unique id for the suggestion],
    'value': [value to be passed to the handleSelect callback function]
    'content': [React Component] or [Text to be show in the UI]
    'literal': [String] This key is REQUIRED only if you are using a ReactJS Component like a content. It is used to decide which text has to be put in the input text when this suggestion is selected, in other case content will be used,    
}
```

### Theme

There are several classes in order to apply a theme to the component:

* sui-autocompleted
* sui-autocompleted-input
* sui-autocompleted-clear
* sui-autocompleted-results
* sui-autocompleted-item
* sui-autocompleted-item--active

The component exports a basic CSS that you can include from the package in the node_modules.

