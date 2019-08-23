/*
* @Author: Zhang Guohua
* @Date:   2019-08-22 20:34:23
* @Last Modified by:   zgh
* @Last Modified time: 2019-08-23 15:30:01
* @Description: create by zgh
* @GitHub: Savour Humor
*/

// 题目：
// 将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。


// 示例： 
// 比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：
// L   C   I   R
// E T O E S I I G
// E   D   H   N
// 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

// 输入: s = "LEETCODEISHIRING", numRows = 3
// 输出: "LCIRETOESIIGEDHN"

// 输入: s = "LEETCODEISHIRING", numRows = 4
// 输出: "LDREOEIIECIHNTSG"
// 解释:

// L     D     R
// E   O E   I I
// E C   I H   N
// T     S     G


// 分析： 
// 1. 小于两行的，没有什么意义。
// 2. 大于两行的，呈特殊排列。

// 思路：
// 1.  常规暴力思路： 循环排列，放入二维数组中，再将二维数组，将行号作为二维数组的下标，将列号作为二维数组中元素的下标，将其叠加即可。
// 2.  直接遍历，通过计算决定最终字符串，省去转为数组的时间和空间。时间复杂度为 On; 第一行中间隔了 2*n -2, 第二行中间隔了 2n-4


// 思路1: 152ms, 47%; 42 17.5%
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert1 = function(s, numRows) {
	let result = '';
	let arr = [];
	if(numRows === 1) {
		return s;
	}
    for(let i = 0; i < s.length; i++) {
    	let temp = i % ( 2 * numRows - 2);
    	let index = Math.floor(i / ( 2 * numRows - 2));
    	if(temp < numRows) {
    		if(!arr[temp]) arr[temp] = [];
    		arr[temp].push(s[i]);
    	} else {
    		arr[2*numRows - temp - 2].push(s[i]);
    	}
    }
    arr.forEach(function(val) {
    	result += val.join('');
    })
    return result;
};


// 思路2:  124ms  84%, 38 62%
/**
 * @param {string}
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
	let result = '';
	if(numRows === 1) {
		return s;
	}
	for(let i = 1; i <= numRows; i++){
		let len = Math.ceil(s.length/(2*numRows - 2));
		for(let j = 0; j < len; j++){
			let temp = s[(i-1) + j * (2* numRows -2)];
			if(temp) result += temp;
			if(1 < i && i < numRows) {
				let temp1 = s[(i-1) + j * (2* numRows -2) + 2*numRows -2*i];
				if(temp1) result += temp1;
			}
		}
	}

	return result;
};

console.log(convert('LEETCODEISHIRING', 3))
console.log(convert('LEETCODEISHIRING', 4))

