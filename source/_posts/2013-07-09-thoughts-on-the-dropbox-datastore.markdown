---
layout: post
title: "Thoughts on the Dropbox Datastore API"
date: 2013-07-09 12:43
comments: false
categories: 
---

As I've stated before, [your app needs to sync](http://informalprotocol.com/2012/11/your-app-needs-to-sync/). This has not gone unnoticed by the startup world, who are offering more and more options for developers to build sync into their apps. Today, Dropbox announced a new [datastore API](https://www.dropbox.com/developers/blog/43/the-datastore-api-a-new-way-to-store-and-sync-app-data), a system for syncing application data (that isn't file-based) into and out of Dropbox.

At first glance, this looks like a wonderful solution. You get a drop-in component on iOS, Android, or the web to put your app's data into the cloud, with very little thought by you. Data gets stored offline automatically. It even handles merging and conflicts quietly in the background. Pretty great, right?

I hope that the Dropbox Datastore API can deliver on these promises. I don't think they're necessarily impossible problems to solve. But these are the exact same problems that Core Data + iCloud claims to solve, and between iOS 5 and iOS 6, iCloud hasn't been able to deliver on that promise. This certainly doesn't mean Dropbox can't, or that the Datastore API has problems. Dropbox is certainly well versed in the concept of syncing blobs of data between multiple systems, silently and effectively, as that's what they've been doing for the last five years. But this solution should be approached skeptically and carefully.

Before you ship your app built with the Dropbox Datastore, these claims should be tested thoroughly. Test data sync across 1, 2, 3, 8 different devices. Test it offline. Introduce conflicts. Save data offline. Try multiple conflicts. Create conflicts on one machine while offline, etc. There's a lot of ways a magic sync solution can fail.

Of course, the benefits to a drop-in solution are immense. You don't have to write sync logic. You don't have to wake up at 4 AM because your MongoDB process randomly died, taking your server API out with it. You don't need to handle the differences in online and offline state. You know there's a company whose goal it is to solve this problem for you; that's their job.

Just be careful. When it comes to any tool that claims to be a cure-all, make sure it does the job.