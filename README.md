# Easy \<details> toggle animation with YMDetails

1. Download YMDetails class code.
1. Insert it into your app.
1. Init using code below:
 
```js
window.addEventListener( 'load', e => {
	document.querySelectorAll( 'details' ).forEach( el => {
		new YMAccordion( el );
	});
});
```
