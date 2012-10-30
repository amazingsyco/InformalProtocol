---
layout: post
title: "Managing Dependencies with CocoaPods"
date: 2012-10-29 23:13
comments: false
categories: Objective-C
---

Dealing with dependencies in Objective-C has always been a tedious process. You typically do some `git submodule` stuff, import their Xcode project into yours, add a dependency, add a linker target, set some compiler flags, etc., or you include the project's `.h` and `.m` files manually. Then you end up running into problems because the header paths are wrong, or you forgot to add some linker flags that include categories, or some other problem. If that project requires ARC or iOS 6, you have to figure that out and set it up to be consistent with your project. Then, when you need to upgrade the library, you need to make sure all these steps still work, and hope nothing new got added that might break. It's a very error prone process. Now, being a stubborn developer that's always done it this way, I've been wary of any tools to automate this process, as I usually think I can handle it myself, and I'm usually wrong. Other languages have had package managers to solve this problem, so why not Objective-C?

[CocoaPods](http://cocoapods.org/) tries to solve this problem by automating the process of fetching dependencies (and recursively fetching their subdependencies), adding them to an Xcode project, managing paths for everything, adding any extra compiler or linker flags, copying in any resources (images, nibs, sounds, or whatever else), and building it into your project. The end result is a very simple process of defining your dependencies in a file (called a `Podfile`), running a command line process, and then just building your app and referencing those dependencies. If you need to update dependencies or add new ones, just add them to the `Podfile` and run the command line process again. It's very simple, and a far cry from managing all this stuff yourself. And, as of this writing, there are over 600 projects you can include in your app.

Under the hood, CocoaPods is creating an Xcode project which builds a static library, `libPods.a`, consisting of all your dependencies. It adds this project to an Xcode workspace and makes your project dependent on `libPods.a` using an Xcode config file. It then rewrites your Xcode project to link `libPods.a` and copy resources, and set some paths to variables included from the config file. It even detects if your project uses ARC, and sets flags appropriately. The result is that the majority of changes to your project are minimal, but instead reference a project that is under the control of CocoaPods, and as such it can be changed while rarely affecting your project. It's a well thought out system.

To get started, you need to install the CocoaPods gem with a `gem install cocoapods` at the command line. Then, in the root of your Xcode project, add a `Podfile` that lists your dependencies and your deployment target. For this example, we'll target an iOS 6 app that depends on the `AFNetworking` and `FormatterKit` projects. You can search for more projects on [CocoaPods.org](http://cocoapods.org/).

```ruby
platform :ios, '6.0'
pod 'AFNetworking', '~> 1.0'
pod 'FormatterKit', '1.0.1'
```

*Note: CocoaPods uses [semantic versioning](http://semver.org) to determine how to handle version numbers. The version string can either be a specific version, or can include an operator that tells CocoaPods to pick a version for you. The `~>` operator says, for version X.Y.Z, "use any version matching X.Y.\*", but you can also use `>`, `>=`, `<`, or `<=` which do what you expect.*

Once you have this in place, run `pod install`. This command will:

- download the `Podfile` for each dependency you list, and those for any subdependencies
- check the requirements for each `Podfile` to ensure that your project meets the minimum requirements (so a Mac project won't be added to an iOS app, or a project that only works on iOS 6 will not work on iOS 5)
- set up a new `xcodeproj` with a static library target for all the source files in the dependency tree
- set up an `xcworkspace` if you don't already have one
- add the Pods `xcodeproj` to this new `xcworkspace`
- create an `xcconfig`file that includes header paths for all dependencies
- change your `xcodeproj` to use the `xcconfig` file for header and linker paths
- add the `libPods.a` library to the Link Bundle With Libraries phase of your 'xcodeproj'
- add a new Copy Pods Resources script phase to copy any resources to your bundle

Once this is in place, you can build and run. Unless there are any problems with the dependencies, Xcode will compile all the dependencies and link them into your app. It's very important that you use the `xcworkspace`, so Xcode knows how to build the Pods project correctly. You can then `#include <AFNetworking/AFNetworking.h>` to begin using the code. That's it!

I've started using CocoaPods on a project and have been enjoying using it over managing dependencies myself. I haven't seen any reason to believe this would be more problematic than doing it all myself, but there are plenty of benefits. Dependencies can be kept up to date much more easily, and their inclusion process is much more strictly defined (and automated). For many projects, it's far more likely to get the setup process right than I am, and it's faster to get set up. I recommend checking it out for your projects.