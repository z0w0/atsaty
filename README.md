# Atsaty

A tweet says a thousand yeps...

  
Atsaty acts like `yes`, but instead of always outputting yeps,
it uses [sentiment analysis](https://github.com/thisandagain/sentiment) to
find the current mood of English-speaking tweeters on Twitter.
If there are more positive tweeters than negative, it outputs yep, otherwise
it outputs nope.

```sh
$ atsaty
y
y
y
...
```

```js
var atsaty = require("atsaty");

atsaty(function(err, yep) {
    if(yep) console.log("Everyone on Twitter seems to be happy");
    else console.log("Tweeters are crying at the moment");
});

atsaty("from:z0w0", function(err, yep) {
    if(yep) console.log("The creator of this pointless thing is happy");
    else console.log("The creator is sad, T__T");
});
```

## Installation

```sh
npm install -g atsaty
```

## Usage

```
atsaty --help

  Usage: atsaty [options]

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -y, --yep <msg>   Message to output for yep
    -n, --nope <msg>  Message to output for nope

```

### Examples

```sh
$ atsaty
y
y
y
...
```

```sh
$ atsaty from:z0w0
n
n
n
...
```

## API

### atsaty([user,] cb)

Uses the [Twitter Search API](https://dev.twitter.com/docs/using-search)
and sentiment analysis to figure out how Twitter is currently feeling.

If `user` is provided, then it will check the mood of a specific Twitter user
instead of the entire Twitter community.  
  
The callback will be called with an error or `null` as its first argument,
`false` as its second if there is no positive tweets or there
are more negative tweets than positive ones, otherwise it calls with a second
argument of `true`.

## License

The project is MIT licensed. See `LICENSE` for more details.
