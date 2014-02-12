---
layout: post
title: "DevCenter.me"
date: 2013-08-07 02:44
comments: false
categories: 
---

In 2013, developers rely on web-based services to get much of their work done. Whether it's looking up server API documentation, provisioning iOS devices, or registering API keys, a part of a developer's day involves going to a website and looking something up. And that means keeping track of how to find all of these disparate websites. The problem is that there's no real standard way or schema to get to them. Each service has a different URL for their developer site. Some examples:

- iOS: http://developer.apple.com/devcenter/ios/
- Android: http://developer.android.com/
- Chrome: https://developers.google.com/chrome/
- Dropbox: https://www.dropbox.com/developers
- Twitter: https://dev.twitter.com/
- Instagram: http://instagram.com/developer/
- Windows: http://msdn.microsoft.com/en-us/windows
- Heroku: https://devcenter.heroku.com/
- Twilio: http://www.twilio.com/docs/api
- Amazon Web Services: http://aws.amazon.com/documentation/

There's 10 different examples, each with completely different URL structures. If you have to interact with more than a few of these, it becomes impossible to keep track of them all in your head. Now, you could rely on bookmarks or web searches, but these aren't as fast as just typing a URL into your browser or using a shortcut in an app like [Alfred](http://alfredapp.com). Speaking from my own experience, for the sites I can keep in my head, I'll type part of the URL and hope that the browser's URL autocomplete will finish the job, simply because it's usually more efficient. But as a human, sometimes I'm wrong, which wastes time. Wouldn't it be great if there was a simple, consistent URL structure for all these different sites?

So I built [DevCenter.me](http://devcenter.me/) to do this. [DevCenter.me](http://devcenter.me/) is a directory of developer sites that can be accessed via consistent URLs that either you or your browser can remember. Each developer site can be accessed via one or more shortcuts (for example, [ios](http://ios.devcenter.me/) for the iOS developer center, or [app.net](http://app.net.devcenter.me/) or [adn](http://adn.devcenter.me/) for App.net) through either of two different URL structures: `shortcut.devcenter.me` or `devcenter.me/shortcut`. These shortcuts are designed to be memorized. Frequently used shortcuts will end up getting persisted in your web browser's URL field (the service sends a 302 temporary redirect, not a permanent one, so your browser will probably still cache it). After a few uses, you can just type `fb` into your browser's URL field, and it will automatically recognize you're typing `fb.devcenter.me`, taking you to the right site in just a few keys.

[DevCenter.me](http://devcenter.me/) was designed to be a productivity tool for developers. There's a [full list](http://devcenter.me/sites.json) of sites and their shortcuts available in JSON, as well as on the [website](http://devcenter.me/) (with shortcuts shown by pressing the option key). You can even download an [Alfred extension](http://devcenter.me/files/devcenter.me.alfredworkflow) to open a site via one of these shortcuts (shout out to [Will Smidlein](http://twitter.com/ws) for writing this, as well as providing the [motiviational](https://twitter.com/ws/status/364184535799300097) [tweets](https://twitter.com/ws/status/364184945956106240) to write this service). And if a site is missing. you can fork the [project on GitHub](http://meta.devcenter.me/), add it to the list, and submit a pull request. When I initially published the project, there were 10 sites. As of this writing less than 12 hours later, there are 56, and undoubtedly more pull requests for me to merge in. That's really cool to see, and I hope people keep submitting requests for more sites.

I built [DevCenter.me](http://devcenter.me/) because keeping track of all these websites was a thorn in my side; wasted memory space in my head. Accessing developer sites may not be a world-changing problem, but saving a few seconds a few times a day adds up over time. A better solution keeps you focused on what you're actually trying to do rather than requiring you to keep estoeric URLs in your head. I hope it finds value as a tool for lots of developers.
