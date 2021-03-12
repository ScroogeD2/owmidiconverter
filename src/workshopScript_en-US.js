// Custom game settings (lobby settings + workshop script) can only be imported 
// if their language matches the text language of the game.
// Only the English settings are needed, as OverPy can translate them to all other languages.
const BASE_SETTINGS = `settings
{
    main
    {
        Description: "Overwatch MIDI Pianist mode by ScroogeD. Convert MIDI songs to Overwatch piano songs with this converter on GitHub: github.com/ScroogeD2/owmidiconverter"
    }

    lobby
    {
        Allow Players Who Are In Queue: Yes
        Match Voice Chat: Enabled
        //restrictSlots
        Max Team 2 Players: 0
        Return To Lobby: Never
    }

    modes
    {
        Skirmish
        {
            enabled maps
            {
                Paris
            }
        }

        General
        {
            Game Mode Start: Manual
            Hero Limit: Off
            Respawn Time Scalar: 30%
        }
    }

    heroes
    {
        General
        {
            Ability Cooldown Time: 0%
            No Ammunition Requirement: On
            Ultimate Generation: 250%
        }
    }
}

variables
{
    global:
        0: notePositions
        1: botSpawn
        2: bots
        3: speedPercent
        4: songPlayingState
        5: timeArrayIndex
        6: playerSpawn
        7: i
        8: pitchArrayIndex
        9: botScalar
        10: maxArraySize
        11: banTpLocation
        12: currentBotIndex
        13: waitTime
        14: timeArrays
        15: pitchArrays
        16: chordArrays
        17: maxBots
        18: defaultHorizontalFacingAngle
        28: hasDecompressionFinished
        29: decompressionPercentages
        30: isCompressionEnabled
        31: numberArray
        32: decompressedValue
        33: compressedArrayLength
        34: decompressedArray
        35: compressedElementLength
        36: songDataElementLength
        37: compressedArray
        38: compressionInfo
        39: finalCompressedElementLength
        40: I
        41: J
        42: K

    player:
        1: playNote
        2: currentPitchIndex
        3: playerToRemove
        4: currentKeyPos
}

subroutines
{
    0: endSong
    1: decompressArray
}

rule("By ScroogeD#5147 (Discord)")
{
    event
    {
        Ongoing - Global;
    }
}

rule("Global init")
{
    event
    {
        Ongoing - Global;
    }

    actions
    {
        Disable Inspector Recording;
        Disable Built-In Game Mode Music;
        "Global.botScalar = 0.100;"
        Global.bots = Empty Array;
        Global.speedPercent = 100;
        Global.hasDecompressionFinished = False;
        Create HUD Text(All Players(All Teams), Null, Null, Custom String("Speed: {0}%", Global.speedPercent), Right, 0, Color(White), Color(White),
            Color(White), Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Null, Custom String(
            "Host player: Press Interact to start and stop the song, \\nand Crouch+Primary or Crouch+Secondary Fire to change speed"), Top,
            0, Color(White), Color(White), Color(White), Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Custom String("By ScroogeD"), Null, Left, 0, Color(White), Color(Yellow), Color(White),
            Visible To and String, Default Visibility);
        Create HUD Text(All Players(All Teams), Null, Custom String("Website: github.com/ScroogeD2/owmidiconverter"), Null, Left, 1, Color(White),
            Color(Yellow), Color(White), Visible To and String, Default Visibility);
        Create HUD Text(Filtered Array(All Players(All Teams), Has Status(Current Array Element, Frozen)), Custom String(
            "The host player has decided to remove you temporarily. Please wait a minute before rejoining."), Null, Null, Top, 1, Color(White),
            Color(White), Color(White), Visible To and String, Default Visibility);
        Create HUD Text(Global.hasDecompressionFinished ? Empty Array : Host Player, Null, Null, Custom String(
            " \\n\\n\\nDecompressing\\nPitch Arrays      {0}%\\nTime Arrays        {1}%\\nChord Arrays   {2}%", 
            Global.decompressionPercentages[0], Global.decompressionPercentages[1], Global.decompressionPercentages[2]), 
            Top, 10, Color(White), Color(White), Color(White), Visible To and String, Default Visibility);
        Global.decompressionPercentages = Array(0, 0, 0);
    }
}


rule("Player init")
{
    event
    {
        Ongoing - Each Player;
        All;
        All;
    }

    conditions
    {
        Is Dummy Bot(Event Player) != True;
        Has Spawned(Event Player) == True;
        Is Alive(Event Player) == True;
    }

    actions
    {
        //restrictAbilities
        Teleport(Event Player, Global.playerSpawn);
        Disable Movement Collision With Players(Event Player);
        Wait(0.016, Ignore Condition);
        Set Facing(Event Player, Direction From Angles(Global.defaultHorizontalFacingAngle, Vertical Facing Angle Of(Event Player)), To World);
        Preload Hero(Event Player, Hero(Symmetra));
    }
}

rule("Dummy init")
{
    event
    {
        Ongoing - Each Player;
        All;
        All;
    }

    conditions
    {
        Is Dummy Bot(Event Player) == True;
    }

    actions
    {
        Teleport(Event Player, Global.botSpawn);
        Disable Movement Collision With Environment(Event Player, False);
        Disable Movement Collision With Players(Event Player);
        Start Scaling Player(Event Player, Global.botScalar, True);
        //invisibleBots
        Wait(0.016, Ignore Condition);
        Set Facing(Event Player, Direction From Angles(Global.defaultHorizontalFacingAngle, 89), To World);
    }
}

rule("Primary fire: increase speed")
{
    event
    {
        Ongoing - Global;
    }

    conditions
    {
        Is Button Held(Host Player, Button(Crouch)) == True;
        Is Button Held(Host Player, Button(Primary Fire)) == True;
    }

    actions
    {
        Global.speedPercent += 5;
    }
}

rule("Secondary fire: decrease speed")
{
    event
    {
        Ongoing - Global;
    }

    conditions
    {
        Is Button Held(Host Player, Button(Crouch)) == True;
        Is Button Held(Host Player, Button(Secondary Fire)) == True;
        Global.speedPercent > 5;
    }

    actions
    {
        Global.speedPercent -= 5;
    }
}

rule("Interact: create dummy bots, start playing")
{
    event
    {
        Ongoing - Global;
    }

    conditions
    {
        Is Button Held(Host Player, Button(Interact)) == True;
        Global.songPlayingState == 0;
        (!Global.isCompressionEnabled || Global.hasDecompressionFinished) == True;
    }

    actions
    {
        "States:\\n0: song not playing\\n1: Preparing to play, creating bots\\n2: song playing" 
        Global.songPlayingState = 1;
        Global.i = 11;
        While(Count Of(Global.bots) < Global.maxBots && Global.i > 0);
            If(!Entity Exists(Players In Slot(Global.i, All Teams)));
                Create Dummy Bot(Hero(Symmetra), Team 1, Global.i, Global.botSpawn, Vector(0, 0, 0));
                Modify Global Variable(bots, Append To Array, Last Created Entity);
            End;
            Global.i -= 1;
            Wait(0.016, Ignore Condition);
        End;
        Wait(1, Ignore Condition);
        Global.songPlayingState = 2;
    }
}

rule("Interact: stop playing")
{
    event
    {
        Ongoing - Global;
    }

    conditions
    {
        Is Button Held(Host Player, Button(Interact)) == True;
        Global.songPlayingState == 2;
    }

    actions
    {
        Call Subroutine(endSong);
    }
}

rule("Play loop")
{
    event
    {
        Ongoing - Global;
    }

    conditions
    {
        Global.songPlayingState == 2;
    }

    actions
    {
        "Because the maximum size of overwatch arrays is 1000 per dimension, the song data arrays are split to several indexes of a 2d array. To get the correct index of the required value in these arrays, modulo and division are used instead of a second index:"
        disabled Continue;
        "value = songArray[math.floor(index / maxArraySize)][index % maxArraySize]"
        disabled Continue;
        "While((index < 2dArrayLength) && songPlayingState)"
        While(Global.timeArrayIndex < Global.maxArraySize * (Count Of(Global.timeArrays) - 1) + Count Of(Last Of(Global.timeArrays))
            && Global.songPlayingState);
            "Get the time interval (milliseconds) between chords from timeArrays, multiply by 1000 to get seconds, modify based on speed"
            Global.waitTime += (Global.timeArrays[Round To Integer(Global.timeArrayIndex / Global.maxArraySize, Down)
                ][Global.timeArrayIndex % Global.maxArraySize]) / (1000) * (100 / Global.speedPercent);
            While(Global.waitTime >= 0.016);
                Wait(0.016, Ignore Condition);
                Global.waitTime -= 0.016;
            End;
            "Loop as many times as there are pitches in the current chord, as indicated by the value in chordArrays. Assign the pitches to the bots."
            For Global Variable(i, 0, Global.chordArrays[Round To Integer(Global.timeArrayIndex / Global.maxArraySize, Down)
                ][Global.timeArrayIndex % Global.maxArraySize], 1);
                Global.bots[Global.currentBotIndex].currentPitchIndex = Global.pitchArrayIndex;
                Global.bots[Global.currentBotIndex].playNote = True;
                Global.currentBotIndex = (Global.currentBotIndex + 1) % Count Of(Global.bots);
                Global.pitchArrayIndex += 1;
            End;
            Global.timeArrayIndex += 1;
        End;
        Wait(0.250, Ignore Condition);
        Call Subroutine(endSong);
    }
}

rule("Stop playing")
{
    event
    {
        Subroutine;
        endSong;
    }

    actions
    {
        For Global Variable(i, 0, 12, 1);
            Destroy Dummy Bot(Team 1, Global.i);
        End;
        Global.bots = Empty Array;
        Wait(0.300, Ignore Condition);
        Global.songPlayingState = 0;
        Global.timeArrayIndex = 0;
        Global.pitchArrayIndex = 0;
        Global.waitTime = 0;
    }
}

rule("Play note")
{
    event
    {
        Ongoing - Each Player;
        All;
        All;
    }

    conditions
    {
        Is Dummy Bot(Event Player) == True;
        Event Player.playNote == True;
    }

    actions
    {
        Event Player.currentKeyPos = Global.notePositions[Global.pitchArrays[Round To Integer(
            Event Player.currentPitchIndex / Global.maxArraySize, Down)][Event Player.currentPitchIndex % Global.maxArraySize]];
        Teleport(Event Player, Event Player.currentKeyPos);
        Wait(0.032, Ignore Condition);
        Start Holding Button(Event Player, Button(Primary Fire));
        Wait(0.032, Ignore Condition);
        Stop Holding Button(Event Player, Button(Primary Fire));
        Event Player.playNote = False;
    }
}

rule("Race condition workaround for very high playing speeds")
{
    event
    {
        Ongoing - Each Player;
        All;
        All;
    }

    conditions
    {
        Event Player.playNote == True;
    }

    actions
    {
        Wait(0.200, Abort When False);
        Event Player.playNote = False;
        Loop;
    }
}

//includeBanSystem

rule("Decompress all arrays")
{
    event
    {
        Ongoing - Global;
    }

    actions
    {
        Wait(0.250, Ignore Condition);
        Abort If(!Global.isCompressionEnabled);
        "Decompress pitch arrays, time arrays and chord arrays"
        For Global Variable(i, 0, 3, 1);
            Global.compressedArray = Empty Array;
            For Global Variable(I, 0, Count Of(Array(Global.pitchArrays, Global.timeArrays, Global.chordArrays)[Global.i]), 1);
                Global.compressedArray[Global.I] = Array(Global.pitchArrays, Global.timeArrays, Global.chordArrays)[Global.i][Global.I];
            End;
            Global.finalCompressedElementLength = Global.compressionInfo[0][Global.i];
            Global.songDataElementLength = Global.compressionInfo[1][Global.i];
            Call Subroutine(decompressArray);
            For Global Variable(I, 0, Count Of(Global.decompressedArray), 1);
                If(Global.i == 0);
                    Global.pitchArrays[Global.I] = Global.decompressedArray[Global.I];
                Else If(Global.i == 1);
                    Global.timeArrays[Global.I] = Global.decompressedArray[Global.I];
                Else If(Global.i == 2);
                    Global.chordArrays[Global.I] = Global.decompressedArray[Global.I];
                End;
            End;
            Global.compressedArray = Empty Array;
            Global.decompressionPercentages[Global.i] = 100;
        End;
        Global.decompressedArray = Empty Array;
        Global.hasDecompressionFinished = True;
    }
}

rule("Decompress array")
{
    event
    {
        Subroutine;
        decompressArray;
    }

    actions
    {
        "Target array for the decompressed data"
        Global.decompressedArray = Empty Array;
        Global.decompressedArray[0] = Empty Array;
        "Current decompressedArray index being written to (max of 1000 elements per index)"
        Global.K = 0;
        "Array for saving individual digits of the element being decompressed"
        Global.numberArray = Empty Array;
        Global.compressedArrayLength = Global.maxArraySize * (Count Of(Global.compressedArray) - 1) + Count Of(Last Of(
            Global.compressedArray));
        For Global Variable(I, 0, Global.compressedArrayLength, 1);
            "Read the compressed element from left to right, append individual digits to numberArray. If this is the last array value, use a different variable to check its length."
            For Global Variable(J, 0,
                Global.I == Global.compressedArrayLength - 1 ? Global.finalCompressedElementLength : Global.compressedElementLength, 1);
                Modify Global Variable(numberArray, Append To Array, Round To Integer(Global.compressedArray[Round To Integer(
                    Global.I / Global.maxArraySize, Down)][Global.I % Global.maxArraySize] / 10 ^ ((
                    Global.I == Global.compressedArrayLength - 1 ? Global.finalCompressedElementLength : Global.compressedElementLength)
                    - 1 - Global.J), Down) % 10);
            End;
            While(Count Of(Global.numberArray) >= Global.songDataElementLength);
                Global.decompressedValue = 0;
                "Construct the original numbers by reading numberArray x elements at a time"
                For Global Variable(J, 0, Global.songDataElementLength, 1);
                    Global.decompressedValue += First Of(Global.numberArray) * 10 ^ (Global.songDataElementLength - 1 - Global.J);
                    Modify Global Variable(numberArray, Remove From Array By Index, 0);
                End;
                Modify Global Variable At Index(decompressedArray, Global.K, Append To Array, Global.decompressedValue);
                If(Count Of(Global.decompressedArray[Global.K]) >= Global.maxArraySize);
                    Global.K += 1;
                    Global.decompressedArray[Global.K] = Empty Array;
                End;
            End;
            "Wait a frame every 25th element to avoid high server load"
            If(Global.I % 25 == 0);
                Wait(0.016, Ignore Condition);
                "Update decomrpession progress HUD"
                Global.decompressionPercentages[Global.i] = 100 * Global.I / Global.compressedArrayLength;
            End;
        End;
    }
}

`;

// Used in case the user chooses to not generate the full gamemode settings.
const CONVERTED_MIDI_VARS = `variables
{
    global:
        10: maxArraySize
        14: timeArrays
        15: pitchArrays
        16: chordArrays
        17: maxBots
        30: isCompressionEnabled
        35: compressedElementLength
        38: compressionInfo
}`;


// Coordinates of player and bot spawns, 
// as well as directions for all 64 keys on the two pianos in Paris (point A and point B)
const PIANO_POSITION_SCRIPTS = {
    pointA: `rule("Note positions array init, Point A")
{
    event
    {
        Ongoing - Global;
    }

    actions
    {
        Global.notePositions = Array(
            Vector(-41.168, 12.876, 34.061), Vector(-41.223, 12.885, 34.038), 
            Vector(-41.168, 12.877, 34.017), Vector(-41.223, 12.885, 33.997), 
            Vector(-41.164, 12.876, 33.982), Vector(-41.161, 12.876, 33.937), 
            Vector(-41.226, 12.886, 33.913), Vector(-41.162, 12.876, 33.898), 
            Vector(-41.217, 12.885, 33.877), Vector(-41.163, 12.877, 33.859), 
            Vector(-41.222, 12.886, 33.834), Vector(-41.153, 12.874, 33.816), 
            Vector(-41.148, 12.875, 33.774), Vector(-41.217, 12.886, 33.753), 
            Vector(-41.153, 12.876, 33.731), Vector(-41.210, 12.885, 33.715), 
            Vector(-41.157, 12.877, 33.696), Vector(-41.143, 12.875, 33.655), 
            Vector(-41.212, 12.886, 33.626), Vector(-41.153, 12.877, 33.610), 
            Vector(-41.205, 12.885, 33.595), Vector(-41.151, 12.877, 33.577), 
            Vector(-41.208, 12.886, 33.551), Vector(-41.154, 12.878, 33.539), 
            Vector(-41.132, 12.874, 33.492), Vector(-41.215, 12.887, 33.465), 
            Vector(-41.151, 12.878, 33.444), Vector(-41.203, 12.886, 33.430), 
            Vector(-41.149, 12.876, 33.415), Vector(-41.146, 12.877, 33.371), 
            Vector(-41.203, 12.886, 33.348), Vector(-41.130, 12.875, 33.326), 
            Vector(-41.202, 12.886, 33.309), Vector(-41.129, 12.875, 33.290), 
            Vector(-41.201, 12.885, 33.271), Vector(-41.143, 12.878, 33.250), 
            Vector(-41.122, 12.875, 33.210), Vector(-41.185, 12.883, 33.184), 
            Vector(-41.139, 12.876, 33.163), Vector(-41.192, 12.886, 33.152), 
            Vector(-41.136, 12.878, 33.126), Vector(-41.132, 12.877, 33.086), 
            Vector(-41.186, 12.884, 33.061), Vector(-41.118, 12.875, 33.046), 
            Vector(-41.190, 12.887, 33.027), Vector(-41.112, 12.873, 33.010), 
            Vector(-41.184, 12.886, 32.986), Vector(-41.126, 12.877, 32.961),
            Vector(-41.116, 12.876, 32.921), Vector(-41.185, 12.885, 32.902), 
            Vector(-41.116, 12.876, 32.886), Vector(-41.192, 12.888, 32.865), 
            Vector(-41.129, 12.878, 32.844), Vector(-41.120, 12.877, 32.802), 
            Vector(-41.180, 12.887, 32.778), Vector(-41.124, 12.878, 32.765), 
            Vector(-41.187, 12.888, 32.745), Vector(-41.108, 12.876, 32.729), 
            Vector(-41.181, 12.887, 32.704), Vector(-41.107, 12.876, 32.686), 
            Vector(-41.112, 12.877, 32.643), Vector(-41.172, 12.886, 32.620), 
            Vector(-41.108, 12.877, 32.604), Vector(-41.167, 12.887, 32.581),
            Vector(-41.104, 12.876, 32.562));
        Set Global Variable(botSpawn, Vector(-41.016, 13.158, 33.314));
        Set Global Variable(playerSpawn, Vector(-34.5, 12, 32.3));
        Set Global Variable(banTpLocation, Vector(-10.008, 15.802, -40.435));
        Set Global Variable(defaultHorizontalFacingAngle, -92.554);
    }
}

`,
    pointB: `rule("Note positions array init, Point B")
{
    event
    {
        Ongoing - Global;
    }

    actions
    {
        Global.notePositions = Array(
            Vector(-85.410, 13.884, -108.012), Vector(-85.364, 13.896, -108.079), 
            Vector(-85.368, 13.886, -108.007), Vector(-85.328, 13.897, -108.078), 
            Vector(-85.325, 13.888, -108.008), Vector(-85.290, 13.887, -107.989), 
            Vector(-85.247, 13.897, -108.050), Vector(-85.256, 13.885, -107.965), 
            Vector(-85.217, 13.895, -108.021), Vector(-85.210, 13.888, -107.968), 
            Vector(-85.180, 13.895, -108.007), Vector(-85.184, 13.883, -107.928), 
            Vector(-85.147, 13.883, -107.916), Vector(-85.095, 13.895, -107.977), 
            Vector(-85.107, 13.883, -107.910), Vector(-85.063, 13.896, -107.973), 
            Vector(-85.066, 13.884, -107.902), Vector(-85.017, 13.886, -107.891), 
            Vector(-84.979, 13.896, -107.954), Vector(-84.987, 13.884, -107.866), 
            Vector(-84.943, 13.896, -107.938), Vector(-84.952, 13.884, -107.854), 
            Vector(-84.908, 13.896, -107.922), Vector(-84.902, 13.886, -107.851), 
            Vector(-84.871, 13.885, -107.836), Vector(-84.826, 13.895, -107.887), 
            Vector(-84.832, 13.885, -107.822), Vector(-84.787, 13.897, -107.894), 
            Vector(-84.795, 13.886, -107.812), Vector(-84.751, 13.888, -107.815), 
            Vector(-84.711, 13.895, -107.857), Vector(-84.720, 13.883, -107.769), 
            Vector(-84.681, 13.895, -107.835), Vector(-84.683, 13.882, -107.759), 
            Vector(-84.643, 13.895, -107.822), Vector(-84.637, 13.887, -107.770), 
            Vector(-84.604, 13.885, -107.745), Vector(-84.563, 13.894, -107.793), 
            Vector(-84.561, 13.888, -107.750), Vector(-84.523, 13.896, -107.791), 
            Vector(-84.524, 13.887, -107.729), Vector(-84.485, 13.884, -107.697), 
            Vector(-84.444, 13.895, -107.759), Vector(-84.445, 13.888, -107.711), 
            Vector(-84.415, 13.894, -107.750), Vector(-84.403, 13.888, -107.694), 
            Vector(-84.373, 13.896, -107.742), Vector(-84.375, 13.885, -107.661), 
            Vector(-84.339, 13.885, -107.649), Vector(-84.292, 13.896, -107.713), 
            Vector(-84.298, 13.886, -107.644), Vector(-84.256, 13.897, -107.715), 
            Vector(-84.262, 13.883, -107.613), Vector(-84.227, 13.883, -107.603), 
            Vector(-84.172, 13.897, -107.684), Vector(-84.183, 13.886, -107.606), 
            Vector(-84.146, 13.895, -107.657), Vector(-84.144, 13.886, -107.592), 
            Vector(-84.103, 13.896, -107.652), Vector(-84.104, 13.885, -107.571), 
            Vector(-84.068, 13.885, -107.560), Vector(-84.021, 13.896, -107.626), 
            Vector(-84.023, 13.886, -107.553), Vector(-83.985, 13.895, -107.598), 
            Vector(-83.987, 13.886, -107.539));
        Set Global Variable(botSpawn, Vector(-84.693, 13.873, -107.681));
        Set Global Variable(playerSpawn, Vector(-85.624, 14.349, -104.397));
        Set Global Variable(banTpLocation, Vector(-83.340, 13.248, -58.608));
        Set Global Variable(defaultHorizontalFacingAngle, 161.2);
    }
}

`}

// Various scripts corresponding to the options on the converter webpage
const SCRIPTS = {
    restrictAbilities: "Disallow Button(Event Player, Button(Melee));Set Ability 1 Enabled(Event Player, False);Set Ability 2 Enabled(Event Player, False);Set Ultimate Ability Enabled(Event Player, False);If(Compare(Event Player, !=, Host Player));Set Primary Fire Enabled(Event Player, False);Set Secondary Fire Enabled(Event Player, False);End;If(Compare(Hero Of(Event Player), ==, Hero(Wrecking Ball)));Disallow Button(Event Player, Button(Crouch));End;",
    invisibleBots: "Set Invisible(Event Player, All);",
    restrictSlots: "Max Team 1 Players: 12",
    includeBanSystem: 'rule("Bans for host player"){event{Ongoing - Global;}conditions{Is Button Held(Host Player, Button(Reload)) == True;Is Button Held(Host Player, Button(Crouch)) == True;}actions{Host Player.playerToRemove = Ray Cast Hit Player(Eye Position(Host Player), Eye Position(Host Player) + Facing Direction Of(Host Player) * 30, Filtered Array(All Players(All Teams), !Is Dummy Bot(Current Array Element)), Host Player, True);Teleport(Host Player.playerToRemove, Global.banTpLocation);Set Status(Host Player.playerToRemove, Null, Frozen, 30);Host Player.playerToRemove = Null;}}'
}
