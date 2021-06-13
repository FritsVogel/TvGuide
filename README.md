# TV Guide

## Assignment

See assignment instructions at https://gist.github.com/glenndehaan/662591603616baf2b55b3726a8fc5d62

## Result

My goal was to show some fundamental knowledge, while getting my head around Node.js and GraphQL (which I've seen but never really played with myself)... and all within limited time of one day for now :-)

Basic things I covered in Node.js: 
* Setting up in separate module files, using private/public methods. I didn't get to or look into creating classes, or organizing logic into Controller/Service/Model/Templates/etc directories (not sure how you usually organize this). Could all have been an option but perhaps a bit over the top here.
* Asynchronous calls, and particularly doing the API calls in parallel, and waiting until all callbacks were received. I placed some extra console logs (now removed) to ensure it was indeed doing it like that instead of doing things sequentially.
* Unit testing, I picked mocka/chai which I liked. Like I mentioned in a todo, I'm curious about mocking features to test the API module.
* API calls, I picked axios over fetch (although both seemed to do the trick here), there may be more options.
* Output to terminal is just using console.log, could be extended to output to logfile through configuration (I'm sure there will be packages to do that in a nice and clean way).
* I used jshint as a lint tool (not too sure whether that "esversion=11" is the best choice) for a quick check, didn't use prettify tools.
* Application wise, I chose to retrieve the channels first (which you have to do, given the available API services). After that all TV schedules for the selected dates for the channel in question are outputted in one blob, ordered by start date. Obvious this can be improved by doing an output per day.
* Error handling and exception catches are basic and not too consistent at this moment, could be improved. E.g. API retries can be added to withstand the occasional "Too many requests" API responses I saw while testing.
* ...and I stole the authentication key from my browser inspector while doing an API call in the API sandbox, seemed to do the trick :-)
* The channels and dates are code constants now, these could have been moved to .env as well if needed. Features could have been built in to find a window of 2 day data, instead of just picking 2 days. And the list goes on. Overall, I did cover all functional requirements from the assignment :-)

## Further instructions

### Installation

* clone project
* copy *.env.dist* to *.env* and specify your authentication key
* run *npm install*

### (Re)create standalone binaries (Linux, MacOS)

* run commands below
  
```
npm install -g pkg
pkg -t node14-macos -o app-node14-macos app.js
pkg -t node14-linux -o app-node14-linux app.js
```

### Run unit tests

```
npm test
```
