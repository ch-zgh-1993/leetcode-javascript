/*
* @Author: Zhang Guohua
* @Date:   2019-08-26 14:33:31
* @Last Modified by:   zgh
* @Last Modified time: 2019-08-26 15:00:14
* @Description: create by zgh
* @GitHub: Savour Humor
*/
// 题目：
// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

// 示例：
// 输入: 123
// 输出: 321

// 输入: -123
// 输出: -321


// 输入: 120
// 输出: 21

// 假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−231,  231 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

// 分析：
// 1. 正负不变，反转其他。
// 2. 溢出判断，无论向上，向下都返回0；


// 思路：
// 1. 先取绝对值，除符号位进行字符串变为数组进行 reverse，再返回字符串取整即可。


// 思路1: 88, 99%; 35.7, 50.3%;
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let symbol = x >= 0 ? '+' : '-';
    let str = (Math.abs(x) + '').split('');
    let num = Number(str.reverse().join(''));
    if(num > Math.pow(2, 31) - 1 || num < Math.pow(-2, 31)) return 0;
    return symbol === '+' ? num : -num;
};

console.log(reverse(123));
console.log(reverse(-123));
console.log(reverse(120))