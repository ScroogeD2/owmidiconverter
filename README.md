# Overwatch MIDI pianist MIDI converter
A tool for converting MIDI files into Overwatch workshop arrays, currently for Overwatch PTR only. [Read more](todo)

If you have any feedback, or if you just want to say hello, you can contact me on Discord: ScroogeD#5147

# MIDI converter webpage
[Click here!](https://scrooged2.github.io/owmidiconverter/midiconverter)

# Features

- Can play up to a few minutes of any song
- Can simultaneously play up to 11 voices
- Percussion instruments are automatically ignored
- Notes outside the range of the Overwatch piano are automatically transposed up or down
- Loops (experimental): see below.

# How to use
- Open the [MIDI converter webpage.](https://scrooged2.github.io/owmidiconverter/midiconverter)
- Upload a MIDI file to the webpage, choose your settings (hover over the texts and read the tooltips for more information), and press Convert MIDI.

If all goes well, you will get some info about the conversion, and a long string containing the custom game settings of the mode. Copy the string by pressing Copy to Clipboard, then open the [Overwatch Custom Game Settings screen.](https://i.imgur.com/C0orYIc.png)
- Click on *Import Settings* to paste in the copied overwatch custom game settings. In case of an error, check what type it is:
..- **Error popup with "Error: Custom game settings too large":** A single workshop rule is too large. You can fix this by setting a lower value to Max Array Elements.
..- **Error in chat with "Error: Script too large":** The script is too large. You can fix this by selecting a smaller time range with Start At and Stop At. 
- (*Highly recommended*) If you are already in a custom game, open the custom game lobby and press Back To Lobby. If you do not do this, the custom game server may crash after restarting.
- Start the custom game.

# Ingame controls

- F: start and stop playing the song

You can control the speed at which the song is played (Note: the minimum time interval between chords/notes is 0.064 seconds. Any delays lower than that will be increased).
- Primary Fire: Speed up by 5 %-points
- Secondary Fire: Slow down by 5 %-points
A negative speed value will make all delays between chords 0.064 seconds, meaning that a rest of 1 second and a rest of 0.1 seconds will both be reduced to 0.064 seconds while playing.

You can also easily remove all game sounds except the piano:
- Host player only: Open the custom game lobby with L, then enter the custom game settings screen. (Optional: if you also want to see the bots playing, you can hide your HUD with Alt+Z)
- Any player: Open the custom game lobby with L. Right click your player icon on the top right corner of the screen, and press Career Profile. (Optional: hide HUD with Alt+Z. Note that Esc -> Career profile also works, but doesn't allow you to hide your HUD.)


# Workshop array structure

The data read by the Overwatch workshop contains pitches and timings of notes in multiple arrays. One chord in an array can have between 1 and 11 pitches, and consists of the following elements:

```
array[i] = Vector(Time, Pitches, Z)
array[i+1] = pitch1
array[i+2] = pitch2
array[i+3] = pitch3
array[i+4] = pitch4
...
array[i+N] = pitchN
```

The vector element contains two pieces of information: Time is the time interval between the current chord and the previous chord, and Pitches is the amount of voices in the current chord.

The Z component of the vector is used for loop information: see Loops todo

The elements following the vector are the pitches in the chord, between 0 and 63. Similar to the pitches of MIDI files, one integer is one semitone. The scale starts at C1 and ends at E6. For example, C4 (262hz) has a pitch of 36.

Each array has its own rule. At the end of each rule, the array is saved in its own index of the SongData array: SongData = [array0, array1, array2, ...]. The maximum amount of pitches needed in any chord is saved in the first element of the first array.

## EXAMPLE
The following array contains a song that plays the note G4 at time 0, followed by a C minor chord at time 0.5, followed by another G note at time 2.0. The maximum amount of voices needed is 3, which is saved as the first element of the whole array:

```
tempArray = []
tempArray.append(3)
tempArray.append(Vector(0, 1, 0))
tempArray.append(43)
tempArray.append(Vector(0.5, 3, 0))
tempArray.append(48)
tempArray.append(51)
tempArray.append(55)
tempArray.append(Vector(1.5, 1, 0))
tempArray.append(43)
SongData[0] = tempArray
```

The array above as a workshop script would be:

```
rule("Song Data")
{
	event
	{
		Ongoing - Global;
	}

	actions
	{
		Set Global Variable(tempArray, Empty Array);
		Modify Global Variable(tempArray, Append To Array, 3);
		Modify Global Variable(tempArray, Append To Array, Vector(0, 1, 3));
		Modify Global Variable(tempArray, Append To Array, 43);
		Modify Global Variable(tempArray, Append To Array, Vector(0.5, 3, 0));
		Modify Global Variable(tempArray, Append To Array, 48);
		Modify Global Variable(tempArray, Append To Array, 51);
		Modify Global Variable(tempArray, Append To Array, 55);
		Modify Global Variable(tempArray, Append To Array, Vector(1.5, 1, 0));
		Modify Global Variable(tempArray, Append To Array, 43);
		Set Global Variable At Index(songData, 0, Global Variable(tempArray));
	}
}
```

# Loops (experimental)
Loops are an experimental feature and not currently supported by the converter webpage. They must be added *manually*.

To add a loop, first convert your MIDI file with the converter page, paste it into Overwatch and copy it from Overwatch. This gives you the workshop rules in a more readable format.

Loop information is saved in the Z component of each chord vector (see array structure above). It can have the following values:

Z = 2:
    Set a loop point.
Z = 3:
    Go back to the set loop point. Continue the song normally when this chord is passed again, i.e. loop only once.
Z = 4:
    Enter an infinite loop between this chord and the set loop point.


# Known issues

- For issues related to the MIDI converter, see [issues on Github.](https://github.com/ScroogeD2/owmidiconverter/issues)
- For workshop gamemode issues, see todo


# Special thanks
(In no particular order)
- Mark Benis, for [the best transcriptions of Pokemon Red/Blue music I've ever seen](https://youtu.be/2WG9V6C1Aew)
- LazyLion and Zezombye, for help with optimizing and debugging
- The workshop team at blizzard, for being awesome in general
