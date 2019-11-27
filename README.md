# Jeopardy

A jeopardy-like web based game that is fed with questions from a JSON file.
Played with two teams, state is stored in local storage automatically.


## File format

```js
{
	// Keys are the categories
	"Category name": [
		// Each category consists of an array of question objects
		{ "answer": "No", "question": "What is not yes?", "difficult": 100 }
	],
}
```

## Music
The game plays a song from the `song.mp3` file while teams have to press buttons.
Place your theme song as that file. Playback happens in a loop.

## Serving
Can be statically served w/out pre-processing.
For local development, have python installed and run `run.sh`, accessible on :7777
