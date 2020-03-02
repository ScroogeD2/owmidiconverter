/* 
 * This file is part of OverPy (https://github.com/Zezombye/overpy).
 * Copyright (c) 2019 Zezombye.
 * 
 * This program is free software: you can redistribute it and/or modify  
 * it under the terms of the GNU General Public License as published by  
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

var emptyStrKw = {
    "": {
        "en-US": ""
    }
}

var normalStrKw = 
//begin-json
{

}
//end-json

var prefixStrKw = 
//begin-json
{

}
//end-json

var postfixStrKw = 
//begin-json
{

}
//end-json

var binaryStrKw = 
//begin-json
{

}
//end-json

var ternaryStrKw = 
//begin-json
{

}
//end-json

var surroundStrKw = 
//begin-json
{

}
//end-json

var stringKw = Object.assign({}, normalStrKw, prefixStrKw, postfixStrKw, binaryStrKw, ternaryStrKw, surroundStrKw, emptyStrKw)

var strTokens = [];

//Generate string tokens
//normal strings
for (var key of Object.keys(normalStrKw)) {
	strTokens.push(key.toLowerCase());
}

//prefix strings
for (var key of Object.keys(prefixStrKw)) {
	strTokens.push(key.substring(0, key.indexOf("{0}")).toLowerCase());
}

//postfix strings
for (var key of Object.keys(postfixStrKw)) {
	strTokens.push(key.substring("{0}".length).toLowerCase());
}

//ternary strings
for (var key of Object.keys(ternaryStrKw)) {
	strTokens.push(key.substring("{0}".length, key.indexOf("{1}")).toLowerCase());
	strTokens.push(key.substring(key.indexOf("{1}")+"{1}".length, key.indexOf("{2}")).toLowerCase());
}

//binary strings
for (var key of Object.keys(binaryStrKw)) {
	strTokens.push(key.substring("{0}".length, key.indexOf("{1}")).toLowerCase());
}

//surround strings
for (var key of Object.keys(surroundStrKw)) {
	strTokens.push(key[0].toLowerCase())
	strTokens.push(key[key.length-1].toLowerCase())
}

//heroes
for (var key of Object.keys(heroKw)) {
	strTokens.push(key.toLowerCase());
}

//Sort reverse alphabetical order for greediness
strTokens = strTokens.sort().reverse();
