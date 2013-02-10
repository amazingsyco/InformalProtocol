---
layout: post
title: "Files as UI vs API"
date: 2013-02-10 13:20
comments: false
categories: 
---

Rene Ritchie on [iCloud vs. Dropbox](http://www.imore.com/stuck-between-dropbox-was-and-icloud-isnt-yet):

> For all Dropbox's automagical-ness, it's a relic of the past. It's a file system. It's a hierarchy. It's a folder sync. It's a bunch of encrypted data stored on Amazon's S3 network.
>
> As much as iCloud is the right idea still not realized, Dropbox is the wrong thing done brilliantly well. And at the end of the day, that still amounts to the wrong thing.

There's an important distinction here, and that's separating *files as UI* from *files as API*. iOS (and, to a lesser but growing extent, Mac OS) has proven the value that users should not have to manage their own file system, that files as UI is a poorer user experience. You shouldn't have to worry about where photos are stored in your photo library; iPhoto will manage collections of photos for you and they get stored on your disk somewhere. Apps can present organizational context that files cannot, letting one photo be in your library, your photo stream, an event, multiple albums, and with multiple people, all without having to exist in folders representing each of these collections. This is a good thing, it's a significant advancement forward in human/computer interaction design, and it's the model that computing on all platforms will be following going forward.

Files as API, however, are as important as ever. Besides being organizational chaos for a user to manage, a file system can be thought of as a structured way of mapping lots of pieces of separate data to a physical disk. Apps can store whatever data they want into a file, and the OS figures out how to actually store it. It's a system that works very well. Using the iPhoto example, those photos may be interacted with in one or many collections with a smarter and more appropriate UI, but that photo is still being stored as a file somewhere on disk.

So while the UI has transcended the need for users to use the Finder for organization, the underlying data still relies on files, which is still the best way to save large amounts of disparate data. Just about every abstraction on files (e.g. databases or object stores) ultimately ends up writing files to the file system. Developers are still heavily reliant on files as API, even if we've moved beyond needing or wanting them in UI.

Besides the key/value store (which I believe uses a different syncing mechanism), iCloud advertises three mechanisms for syncing data - the file store, the document store, and the Core Data store. All of these are actually based on the same syncing mechanism for syncing files (a "document" refers to something like a Pages document, which is stored on disk as a folder with multiple files for separate images, text, and metadata; Core Data store refers to database-style apps that have lots of little pieces of data and maybe some files that go along with them). With iCloud, developers get a folder that the user never ever sees called a "container" to move files to and from the cloud. And it's this basic file/folder synching mechanism that is apparently flawed, as there have been many reports of iCloud-based apps that have had problems, whether they're based on Core Data, on documents, or on other storage with files.

Dropbox, on the other hand, was designed around files, both from a UI point of view and an API point of view. This means their file syncing is very, very good. If a file gets put into a Dropbox somewhere, it ends up everywhere quickly, basically with absolute reliability (short of network errors). If you're building an app that [needs to sync](http://informalprotocol.com/2012/11/your-app-needs-to-sync/), that kind of reliability is *exactly* what you're looking for. And you're already using files to store stuff. The Dropbox file UI side of things is optional for users; they have to seek it out, either on the website or by having one of the Dropbox apps - there's nothing stopping you from having a Dropbox account purely for syncing data, without ever installing the Mac app or viewing a directory on the web site. But their syncing of files works. Apps can build better UI on those files whether they're stored locally, stored in Dropbox, or stored in iCloud. But Dropbox has proven it's reliability, and iCloud hasn't.

So while there is an argument to be made that Dropbox's UI is a relic, its value as a syncing engine is still huge, precisely because it's built around the paradigm of files, a paradigm we have decades of experience working with. 