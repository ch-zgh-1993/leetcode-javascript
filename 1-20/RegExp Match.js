/*
* @Author: Zhang Guohua
* @Date:   2020-01-09 20:28:55
* @Last Modified by:   zgh
* @Last Modified time: 2020-04-20 17:50:55
* @Description: create by zgh
* @GitHub: Savour Humor
*/

// 题目： 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。 '.' 匹配任意单个字符 '*' 匹配零个或多个前面的那一个元素 
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。


// 示例1：
// 输入:
// s = "aa"
// p = "a"
// 输出: false
// 解释: "a" 无法匹配 "aa" 整个字符串。

// 示例2:
// 输入:
// s = "aa"
// p = "a*"
// 输出: true
// 解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。


// 示例 3:

// 输入:
// s = "ab"
// p = ".*"
// 输出: true
// 解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。


// 示例 4:
// 输入:
// s = "aab"
// p = "c*a*b"
// 输出: true
// 解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。

// 示例 5:
// 输入:
// s = "mississippi"
// p = "mis*is*p*."
// 输出: false


// 分析：
// 1. 实现类似于正则的效果，遇到 .  和  *进行替换。
// 2. 其他字符直接划等。


// 思路： 
// 1. 通过 js  自带的正则实现匹配效果，这算是一个投机的方法。但这也是作为开发首要尝试的方法。
// 2. 常规方式： 通过匹配字符中的是否存在.*, 存在时 . 替换同位置字符， * 替换 n 个后续字符。 进行判断。
// 3. 可以使用 replace 方法进行替换，再去比较。



// 思路1: 92ms  57.66%;  35.1mb 33.15%
// 想借用原始正则之便，首先题目需要全部匹配，而正则是部分匹配，所以要固定前后位置。再开始匹配。 . 默认为任意字符，该意义相同。 * 默认为 0 或多个，意义相同。
// 正则可能耗时在转换和匹配过程，毕竟我们要实现的功能是简单的。所以可以尝试第二种思路。

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch1 = function(s, p) {
	if ((!p.includes('.') && !p.includes('*'))) return s === p
	const pattern = new RegExp(`^${p}$`)
    return pattern.test(s)
};


// 思路2: x 掉
// 明确思路： 分情形，若不含 . 或 * ，直接比较。  若包含，则进行特殊字符替换。替换完成进行对比。
// 这个代码好丑好丑！！！ 。
// 重新分析，之前的思路是拿 regexp 去循环匹配 string. 现在反一下。应该是拿定量，去分析变量，情况会少很多。
// 正常分析完了，还有一种倒退，就是 bbbba 与 .*a*a 。 .* 已经可以匹配完了，但是后面还有多余的内容。其实也是正常匹配的情形。 采用反向重新匹配，如果可以正常匹配，则没有问题。

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch2 = function(s, p) {
    if ((!p.includes('.') && !p.includes('*'))) return s === p
   	let status = false
    let fl = 0
    function match (ds, dp) {
    	const a = (ds || s).split('')
		const b = (dp || p).split('')
		ds !== undefined && (status = true)
		let j = 0
		for (let i = 0; i < a.length; i++) {
			if (a[i] === b[j] || b[j] === '.') {
				j++
			} else if (b[j] === '*' && (a[i] === b[j-1] || b[j-1] === '.')) {
				// 不加
			} else if (b[j + 1] === '*') {
				if (b.length > j+2) {
					j= j+2
					i--
				} else {
					return false
				}
			} else if(b[j] === '*') {
				i--
				j++
			} else {
				return false
			}
		}
		if(b[j] === '*') j++
		if (status) {
			console.log(j, fl)
			if (j + fl > p.length || (j + fl === p.length && p.includes('*'))) {
				return true
			} else {
				const index = p.substring(fl, p.length-j).split('')
				return index.length > 1 && index.every((val, i) => i === p.length-1 || p[i+1] === '*')
			}
		}

		if (b.length > j) {
			!status && (fl = j)
			let pp = p.split('').reverse()
			for (let k = 0; k < pp.length; k++) {
				if (pp[k] === '*') {
					pp[k] = pp[k + 1]
					pp[k + 1] = '*'
					k++
				}
			}
			return !status && match(s.split('').reverse().join(''), pp.join(''))
		} else {
			return true
		}
    }
    return match()
};

// 思路3: 80ms 91.42%; 35.8mb 42.86%
// 参照官方， 使用动态规划算法，用空间换取时间。
// 自底向上： 

var isMatch = function(s, p) {
	let dp = Array(s.length +1)
	for(let i = 0; i< dp.length; i++) {
		dp[i] = Array(p.length + 1)
	}
	dp[s.length][p.length] = true

	for (let i = s.length; i >= 0; i--) {
		for (let j = p.length - 1; j >= 0; j--) {
			let fm = i < s.length && (p[j] === s[i] || p[j] === '.')
			if (j+1 < p.length && p[j+1] === '*') {
				dp[i][j] = dp[i][j+2] || (fm && dp[i + 1][j])
			} else {
				dp[i][j] = fm && dp[i+1][j+1]
			}
			console.log(dp[i][j])
		}
	}
	return !!dp[0][0]
};


console.log(isMatch('aab', 'c*a*b'))
// console.log(isMatch('ab', '.*'))
// console.log(isMatch('aa', 'a*')) 
// console.log(isMatch('bbaaa', 'bba*')) 
// console.log(isMatch('mississippi', 'mis*is*ip*.'))
// console.log(isMatch('a', 'ab*'))
// console.log(isMatch('bbbba', '.*a*a'))
// console.log(isMatch('aaa', 'a*c*a'))
// console.log(isMatch('aaa', 'ab*a*c*a'))
// console.log(isMatch('ab', '.*..'))
// console.log(isMatch('', '.*'))
// console.log(isMatch("aasdfasdfasdfasdfas", "aasdf.*asdf.*asdf.*asdf.*s"))
// console.log('false')
// console.log(isMatch('abcd', 'd*')) // false
// console.log(isMatch('a', 'ab*a'))
// console.log(isMatch('aa', 'a'))
// console.log(isMatch('aaaaaabbb', 'a*'))
// console.log(isMatch('mississippi', 'mis*is*p*.'))
// console.log(isMatch('', '.'))
// console.log(isMatch('a', 'a.'))







































































