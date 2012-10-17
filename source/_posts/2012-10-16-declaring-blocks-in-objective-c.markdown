---
layout: post
title: "Declaring Blocks in Objective-C"
date: 2012-10-16 22:06
comments: false
categories: Objective-C
---

Blocks in Objective-C are super useful for making your object-oriented code a bit more functional. But as blocks are an extension to the C language, they have to play by the rules of C, so the syntax is a little obscure, and the documentation can be a little hard to find. So here's a guide on how to declare blocks so you can use them in various scenarios.

The standard way of declaring a block:

```objective-c
returnType (^variableName)(parameters);

void (^handler)(NSString *thing1, int thing2); // call with handler(@"foo", 42);
int  (^block)(NSString *); // call with: int value = block(@"foo");
BOOL (^doSomething)(void); // call with: BOOL response = doSomething();
```

The order here is return type, then the block name, then the parameters, or void if you have none. Counterintuitively, the variable name is NOT the last thing on the list. It comes after the `^` which accompanies blocks. Parentheses are significant, so don't forget them. You can also add or remove whitespace between anything. When declaring a block like this, you can supply names for the parameters, or omit them. They're a good thing to add, though; if you use Xcode to autocomplete one of these, it will include the parameter names in the autocompleted method call, and omit them (leading to compile errors you have to manually fix) if you don't.

If you find yourself using a block type in more than one place, you can make it a typedef. Xcode even has a handy autocomplete for this, by typing `typedefBlock` and autocompleting, you'll get a template that is way easier to use than remembering all this stuff. Then you can reference it like any other typedef. Again, parentheses are significant, whitespace is not.

```objective-c
typedef returnType (^typedefName)(parameters);

typedef void (^MyBlockType)      (NSString *thing1, int thing2);
typedef int  (^MyOtherBlockType) (NSString *);
typedef BOOL (^MyThirdBlockType) (void);
```

**Properties:**

```objective-c
@property (nonatomic, copy) void (^handler)(NSString *param1, int param2);
@property (nonatomic, copy) void (^block)(NSString *);
@property (nonatomic, copy) BOOL (^doSomething)(void);

@property (nonatomic, copy) MyBlockType aBlock;
```

**Instance Variables:**

```objective-c
@interface MyBlockThing : NSObject {
	void (^handler)(NSString *thing1, int thing2);
	int  (^block)(NSString *);
	BOOL (^doSomething)(void);

	MyBlockType aBlock;
}
@end
```

**Stack Variables:**

```objective-c
-(void)run{
	void (^handler)(NSString *thing1, int thing2) = ^(NSString *thing1, int thing2){
		// do something
	};

	int (^block)(NSString *) = ^int(NSString *thing1){
		// do something
		return 42;
	};

	BOOL (^doSomething)(void) = ^BOOL(void){ // note: the (void) is optional here
		// do something
		return YES;
	};

	MyBlockType aBlock = ^(NSString *param1, int param2){
		// do something;
	};

	handler(@"foo", 42);
	int value = block(@"foo");
	BOOL response = doSomething();
	aBlock(@"foo", 42);
}
```

**C Function Parameters:**

```objective-c
void doSomethingWithBlock1(void (^block)(char *thing1, int thing2));
void doSomethingWithBlock2(int (^block)(char *));
void doSomethingWithBlock3(bool (^block)(void));
void doSomethingWithBlock4(MyBlockType block);
```

**Objective-C Method Parameters:**

Note: When writing method signatures that include blocks, you do NOT include the name after the `^` declaration. Instead, you include it like any other Objective-C method parameter name, just outside of the type's parentheses.

```objective-c
-(void)doSomethingWithBlock1:(void (^)(NSString *thing1, int thing2))block;
-(void)doSomethingWithBlock2:(int (^)(NSString *))block;
-(void)doSomethingWithBlock3:(BOOL (^)(void))block;
-(void)doSomethingWithBlock4:(MyBlockType)block;
```

So there you have it. Those are the most common cases for declaring Objective-C blocks. Go forth and do evil with them. For more information on blocks, see Apple's [Blocks Programming Guide](https://developer.apple.com/library/mac/#documentation/Cocoa/Conceptual/Blocks/Articles/00_Introduction.html) and Apple's [Short Practical Guide to Blocks](http://developer.apple.com/library/ios/#featuredarticles/Short_Practical_Guide_Blocks/_index.html).