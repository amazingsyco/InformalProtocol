---
layout: post
title: "async.js"
date: 2012-10-16 01:03
comments: false
categories: JavaScript
external-url: https://github.com/caolan/async
---

One of JavaScript's greatest strengths is its extremely powerful `function` syntax. You can use it to encapsulate portions of code, large or small, and pass these invocations around as any other object. node.js takes this and builds an entire API on top of it. This power is great, but unchecked, it can lead to convoluted and complex code, the "callback spaghetti" problem. Here's a sample JavaScript function which chains together some asynchronous APIs.

```javascript
function run() {
	doSomething(function(error, foo) {
		if(error){
			// handle the error
		}else{
			doAnotherThing(function(error, bar) {
				if(error){
					// handle the error
				}else{
					doAThirdThing(function(error, baz){
						if(error){
							// handle the error
						}else{
							// finish
						}
					});
				}
			});
		}
	});
}
```

async.js tries to fix this by providing APIs for structuring these steps in a more logical fashion while keeping the asynchronous design pattern that works so well. It offers a number of control flow management tools for running asynchronous operations serially, in parallel, or in a "waterfall" (where if any step has an error, the operation doesn't continue). It also works with arrays, and can iterate over items, run map/reduce/filter operations, and sort arrays. It does all of this asynchronously, and returns the data in a structured manner. So the above code looks like this:

```javascript
function run() {
	async.waterfall([
		function(callback){
			doSomething(function(error, foo){
				callback(error, foo);
			});
		},
		function(foo, callback){
			doAnotherThing(function(error, bar){
				callback(error, foo, bar);
			});
		},
		function(foo, bar, callback){
			doAThirdThing(function(error, baz){
				callback(error, foo, bar, baz);
			});
		}
	], function(error, foo, bar, baz){
		if(error){
			// one of the steps had an error and failed early
		}else{
			// finish
		}
	});
}
```

While the resulting code may be a little longer in terms of lines, it has a much more clearly defined structure, and the error cases are handled in one place, not three. This makes the code much more readable and maintainable. I love this pattern so much, I've begun porting it to Objective-C as [IIIAsync](http://github.com/amazingsyco/IIIAsync). If you're a JavaScript developer, and you use `function` for its more advanced use cases, you want to use async.js.