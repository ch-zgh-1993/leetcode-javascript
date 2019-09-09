/*
* @Author: Zhang Guohua
* @Date:   2019-08-21 20:26:22
* @Last Modified by:   zgh
* @Last Modified time: 2019-09-09 10:53:08
* @Description: create by zgh
* @GitHub: Savour Humor
*/


// 题目
// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 示例
// 输入: "babad"
// 输出: "bab"
// 注意: "aba" 也是一个有效答案。

// 输入: "cbbd"
// 输出: "bb"


// 题意分析
// 1. 字符串最大长度，但可能用不到最大长度。
// 2. 回文正反读都一样。
// 3. 如果两个回文长度最大且相同，那么两个都是正确答案。

// 思路：
// 1. 常规思路，从首字母向后查找，查到一个回文，缓存最长的回文和长度，继续查找，直到整个字符串结束。过程中有： 当剩余字符小于最大回文长度，即可停止查找。
// 2. 回文即从一个字符向外扩散，找到为回文的字符串进行缓存，因为回文从内部向外，应该一直时回文。有最长的字符串后，直接看最长的是否为回文，如果不是，直接退出。是的话再继续看。

// 若反转字符串理论上来说，不算循环。 2思路仍然可以优化。

// 3. 看了官方的说明后的解法： 
// 		1. 最长公共子串： 反转字符串，寻找相同的字符串，且反转后的位置与初始字符串位置确认是否为同一字符串。



// 思路1: 超出时间限制。
// 这个肯定是不行的。
/**
 * @param {string}
 * @return {string}
 */
var longestPalindrome1 = function(s) {
	let count = 0;
    const arr = s.split('')
    let len = 0, str = '';
    for(let i= 0; i < arr.length; i++){
    	let tempStart = arr[i];
    	let tempStr = tempStart;
    	if(len < tempStr.length) {
    		len = tempStr.length;
    		str = tempStr;
    	}
    	if(len > (arr.length - i) || len === arr.length){
    		break;
    	}
    	for(let j = i+1; j < arr.length; j++) {
    		console.log('次数 ' + count++)
    		tempStr += arr[j];
    		if(tempStr === (tempStr.split('').reverse().join('')) && len < tempStr.length) {
	    		len = tempStr.length;
	    		str = tempStr;
	    	}
    	}
    }
    return str;
};

// 思路2: 
// 第一次： 忘记偶数回文。。
// 第二次： 仍然是超出时间限制，两个算法在 998 个字符串时，均用了较长时间。
/**
 * @param {string}
 * @return {string}
 */
var longestPalindrome2 = function(s) {
	if(s.length === 0) return s;
	const arr = s.split('')
    let len = 1, str = arr[0];
    for(let i = 0; i < arr.length; i++) {
    	if(Math.ceil(len/2) > (arr.length - i) || len === arr.length) break;
    	// 奇数回文
    	for(let j = (len + 1)/2; i - j >= 0 && i + j < arr.length + 1; j++) {
    		let tempStart = arr.slice(i-j, i+j+1);
    		let tempStr = tempStart.join('');
    		if(tempStr === (tempStart.reverse().join('')) && len < tempStr.length){
    			len = tempStr.length;
	    		str = tempStr;
    		}
    	}
    	// 偶数回文
    	for(let j = len > 1 ? (len+1)/2 : 0; i - j >= 0 && i + j < arr.length + 1; j++) {
    		let tempStart = arr.slice(i-j, i+j+2);
    		let tempStr = tempStart.join('');
    		if(tempStr === (tempStart.reverse().join('')) && len < tempStr.length){
    			len = tempStr.length;
	    		str = tempStr;
    		}
    	}
    }
    return str;
};

// 思路3:  144ms 70%, 27.2MB 56%
// 提交了几次都是超时，三翻两次寻找原因，结果发现忽略了一个严重的问题，即第二次回文循环时，如果不存在重复字符，完全可以跳出循环，这会让原本需要 500000 次的执行次数，瞬间变为1000 以内。 
	// 这么来看，前两个思路应该也是忽略了某些内容，导致时间过长。回看一下。
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome3 = function(s) {
    let len = 0, str = '';
    let s1 = s.split('').reverse().join('');
    for(let i = 0; i < s.length; i++) {
    	if(len < 1) {
    		len = 1;
    		str = s[0]
    	}
    	if(len > (s.length - i) || len === s.length) break;
    	for(let j = i + len; j < s.length; j++) {
    		let temp = s.slice(i, j + 1);
    		let start = s1.indexOf(temp), end = start + temp.length - 1;
    		if(start === -1) break;
    		if(start > -1 && temp.length > len && i === (s.length - 1 - end) && j === (s.length - 1 -start)) {
    			len = temp.length;
    			str = temp
    		}
    	}
    }
    return str;
};


// 自测
// console.log(longestPalindrome('"abacab"'))
// console.log(longestPalindrome("cbbd"))
// console.log(longestPalindrome("ababababa"))
// console.log(longestPalindrome("aabbaa"))
console.log(longestPalindrome('civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheeart'))
// console .log(longestPalindrome("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"))
// console.log(longestPalindrome("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))

