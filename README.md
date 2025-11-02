# skeuomusic

A music player web-app based on the Music app in [iOS 6](https://en.wikipedia.org/wiki/IOS_6).

This is primarily a fun personal project to mess around with CSS and learn SolidJS.

iOS 6 was the final iteration of Apple's [skeuomorphic](https://en.wikipedia.org/wiki/Skeuomorph) design system on mobile.
I have fond memories of using it on my first smart device, the [4th generation iPod Touch](<https://en.wikipedia.org/wiki/IPod_Touch_(4th_generation)>).

### Tech

- Written in SolidJS with TanStack Router.
- Uses the Spotify API.

### Current State

Works as a Spotify playback remote and limited library viewer.

### Goals

- "Play Next" and "Play Last" queueing system. I had this functionality on my jailbroken iPod via [Cyueue](https://cydia.saurik.com/info/com.saurik.cyueue/), but I may decide to use a different UI.
- Add support for local files. I'd support Apple Music if they didn't charge 100 USD for the privilege of using their API.

### Notes

- Bun server capabilities: https://bun.com/blog/bun-v1.3
- Useful for reverse-engineering colour opacity: https://codepen.io/quyenvsp/pen/jOLBBmX

# plan

- remove undo system, just retry or show error
- store shouldn't need to create the client
- it needs a listener system instead
- requestSync shouldn't be needed, client can manage that
- also passing setState callback seems unnecessary and a bit dodgy - client should just dispatch actions?
- I think i was trying to isolate it from action dispatching to avoid loops, it doesn't need to dispatch actions apart from sync state

setting up a client should be:

- component injects the store (root store?)
- component creates client and registers it as a listener
- although there should probably only be one active listener at a time?
  otherwise we get double ups in requests
