/*
* @Author: Zhang Guohua
* @Date:   2018-09-28 11:07:59
* @Last Modified by:   zgh
* @Last Modified time: 2018-09-28 19:29:52
* @Description: create by zgh
* @GitHub: Savour Humor
*/

// 题目:
// 给定一个字符串，找出不含有重复字符的最长子串的长度。
// 
// 示例 1:

// 输入: "abcabcbb"
// 输出: 3 
// 解释: 无重复字符的最长子串是 "abc"，其长度为 3。
// 示例 2:

// 输入: "bbbbb"
// 输出: 1
// 解释: 无重复字符的最长子串是 "b"，其长度为 1。
// 示例 3:

// 输入: "pwwkew"
// 输出: 3
// 解释: 无重复字符的最长子串是 "wke"，其长度为 3。
//      请注意，答案必须是一个子串，"pwke" 是一个子序列 而不是子串。
//      


// 题意分析：
// 1. 	 任意字符串
// 2. 	 切割字符串，从任意位置起
// 3. 	 取到不重复的字符串最长的长度
// 


// 思路：
// 
// 前提： 若为0， 则返回0；
// 
// 1. 从每个位置开始，找出不重复的最长字符串长度，取其中最大的值即可。(直观思路) O(n3)
// 	
// 2. 其实当第一个已经检查到 i 时，在 i+1 时有重复字符串，那么第二次索引只需要在 i+1 开始即可。
// 
// 
// 3. 其实，在你考虑的过程中，你会发现，在 i+1 有重复字符时，你可以知道在哪个位置重复，那么这个位置前的都可以省略，直接从重复位置的下个位置开始计算即可。并且，你可以判断剩余的
// 即过滤头部到达数组结尾的长度是否小于当前的最大值，若小于，则直接终止循环即可。


// 1. 
// 
// 	1. 顾全首尾。
// 	2. 思路细致，要想清楚下次进几，不能感觉。
// 	
// 用时： 384ms，33.1%
// 
!function (){
	var lengthOfLongestSubstring = function(s) {
		let result = 0;

		let temp = '';
		let index = 0;
	    for(let i = 0, len  = s.length; i <= len; i++){
	    	let indexs = s.charAt(i);
	    	if(indexs === ''){
	    		if(result < temp.length) result = temp.length;
	    		return result;
	    	}
	    	if(temp.indexOf(indexs) === -1){
	    		temp += indexs;
	    	}else{
	    		if(result < temp.length) result = temp.length;
	    		temp = '';
	    		index = index + 1;
	    		i = index - 1;
	    	}

	    }

	    return result;
	};

	console.log(lengthOfLongestSubstring("aab"));
}();


// 2. 
// 	1. 注意操作循环变量，或者操作截取时的位置问题即可。
!function (){
	var lengthOfLongestSubstring = function(s) {
		let result = 0;
		let temp = '';
		let index = 0;
	    for(let i = 0, len  = s.length; i <= len; i++){
	    	let indexs = s.charAt(i);
	    	if(indexs === ''){
	    		if(result < temp.length) result = temp.length;
	    		return result;
	    	}
	    	index = index + 1;
	    	if(temp.indexOf(indexs) === -1){
	    		temp += indexs;
	    	}else{
	    		if(result < temp.length) result = temp.length;
	    		temp = temp.slice(1);	
	    		if(temp.length > 0){
	    			i = temp.length;
	    		}else{
	    			i = index - 1;
	    		}
	    	}
	    }

	    return result;
	};

	console.log(lengthOfLongestSubstring("abcdefbabcdefgh"));
}();