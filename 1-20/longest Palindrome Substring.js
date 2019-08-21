/*
* @Author: Zhang Guohua
* @Date:   2019-08-21 20:26:22
* @Last Modified by:   zgh
* @Last Modified time: 2019-08-21 21:08:22
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


// 思路1: 
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const arr = s.split('')
    let len = 0, str = '';
    for(let i= 0; i < arr.length; i++){
    	let tempStart = arr[i];
    	let tempStr = tempStart;
    	if(len < tempStr.length) {
    		len = tempStr.length;
    		str = tempStr;
    	}
    	if(len > (arr.length - i)){
    		break;
    	}
    	for(let j = i+1; j < arr.length; j++) {
    		tempStr += arr[j];
    		if(tempStr === (tempStr.split('').reverse().join('')) && len < tempStr.length) {
	    		len = tempStr.length;
	    		str = tempStr;
	    	}
    	}
    }
    return str;
};

// 自测
console.log(longestPalindrome('babad'))
console.log(longestPalindrome('civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth'))