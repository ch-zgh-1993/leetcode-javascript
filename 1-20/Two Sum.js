/*
* @Author: Zhang Guohua
* @Date:   2018-09-20 09:45:19
* @Last Modified by:   zgh
* @Last Modified time: 2018-09-21 19:12:14
* @Description: create by zgh
* @GitHub: Savour Humor
*/
// 题目：
// 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。
// 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。
// 
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
// 


// 题意分析：
// 1. 题目未说明是否有序，虽给定有序数组，故不认为有序。
// 2. 整数数组，可以有负值


// 思路：
// 1. 寻常思路：找出两个数，加完判断。
// 2. 其实不一定要找出两个数，可以判断另一个数是否在数组中。


// 解：
// 1. 第一次提交： 780ms, 7.5%
// 
!function() {
	/**
	 * @param {number[]} nums
	 * @param {number} target
	 * @return {number[]}
	 */
	
	var twoSum = function(nums, target) {
	    let arr = nums;
	    for(let i = 0, len = arr.length; i < len; i++){
	    	let value = arr[i];
	        let temp = target - value;
	        let loc = arr.indexOf(temp);
	        if(loc > -1 && loc !== i){
	            return [i, loc];
	        }
	    };
	};
	// 提供测试用例，因为应该过滤掉同一个元素使用两次，当前测试用例不可以。
	console.log(twoSum([2, 1, 3, 4, 5], 4));
}();

// 2. 第二次提交: 240ms, 28.5%
// 这里本意是缓存 nums, 在实际开发中可能发生的参数或结构修改，故缓存函数参数，其实应该对于全局或其他更上级变量，当前函数无意义。
// 
!function() {
	/**
	 * @param {number[]} nums
	 * @param {number} target
	 * @return {number[]}
	 */
	
	var twoSum = function(nums, target) {
	    for(let i = 0, len = nums.length; i < len; i++){
	    	let value = nums[i];
	        let temp = target - value;
	        let loc = nums.indexOf(temp);
	        if(loc > -1 && loc !== i){
	            return [i, loc];
	        }
	    };
	};
	// 提供测试用例，因为应该过滤掉同一个元素使用两次，当前测试用例不可以。
	console.log(twoSum([2, 1, 3, 4, 5], 4));
}();





