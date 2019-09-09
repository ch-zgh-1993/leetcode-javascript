/*
* @Author: Zhang Guohua
* @Date:   2019-09-09 19:32:01
* @Last Modified by:   zgh
* @Last Modified time: 2019-09-09 20:57:17
* @Description: create by zgh
* @GitHub: Savour Humor
*/
// 题目
// 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。


// 示例：
// 输入: 121
// 输出: true

// 输入: -121
// 输出: false
// 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

// 输入: 10
// 输出: false
// 解释: 从右向左读, 为 01 。因此它不是一个回文数。

// 分析：
// 1. 题目给出的是，回文，整数。不包括常用的字符串。
// 2. 负数都不是回文。
// 3. 应该可以通过正则判断。
// 4. 转为 string , 通过 array.reverse 判断是否是回文。
// 5. 通过循环的话，循环到 1/2 即可。


// 思路：
// 1. 通过循环判断
// 2. 通过 string, array 等进行判断。
// 3. 通过正则判断。 因为无法确定捕获的次数，所以也无法确定反向引用的次数。可能不能通过正则简单实现，如果复杂，可能也需要通过 1/2 次循环，同思路1 优化，可能不是简便的方法。


// 思路1: 328ms, 64.85%; 45.8, 44.53%;
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome1 = function(x) {
	let s = x + '', r = true
    for(let i = 0; i < s.length; i++) {
    	if(i >= s.length/2) break;
    	if(s[i] !== s[s.length - 1 - i]) {
    		r = false;
    		break;
    	}
    }
    return r;
};
// 思路1优化： 308ms, 82.13%; 46.2m 19.5%
// 特殊情形先行，节约时间
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome2 = function(x) {
    if(x < 0) return false;
    let s = x + '', r = true, len = Math.floor(s.length/2)
    for(let i = 0; i < len; i++) {
    	if(s[i] !== s[s.length - 1 - i]) {
    		r = false;
    		break;
    	}
    }
    return r;
};

// 思路2: 356ms, 39.52%; 46.3, 14.57%
// 这个果然是更慢一点的，像 reverse 其实算是遍历了一遍为 O(n)
var isPalindrome3 = function(x) {
	if(x < 0) return false
	return (x + '').split('').reverse().join('') === x + ''
};

// 思路2 变化： 通过字符串的方法截取对比。
// 执行用时 : 344 ms, 在所有 JavaScript 提交中击败了50.02%的用户内存消耗 :46.4 MB, 在所有 JavaScript 提交中击败了10.62%的用户
// 
var isPalindrome = function(x) {
	if(x < 0) return false;
	x += '';
	let len = Math.floor(x.length/2);
	return x.substring(0, len) === x.substring(x.length-len).split('').reverse().join('')
};


// 测试例：
console.log(isPalindrome(121))
console.log(isPalindrome(-121))
console.log(isPalindrome(10))

