/*
* @Author: Zhang Guohua
* @Date:   2018-09-29 14:32:54
* @Last Modified by:   zgh
* @Last Modified time: 2018-09-29 14:37:57
* @Description: create by zgh
* @GitHub: Savour Humor
*/

// 1. 最小差值
// 
// 给定一个整数数组 A，对于每个整数 A[i]，我们可以选择任意 x 满足 -K <= x <= K，并将 x 加到 A[i] 中。

// 在此过程之后，我们得到一些数组 B。

// 返回 B 的最大值和 B 的最小值之间可能存在的最小差值。
// 
// 
!function(){
	var smallestRangeI = function(A, K) {
	    A.sort((a, b) => {
	    	return a - b;
	    });
	    let min = A[0] + K;
	    let max = A[A.length-1] - K;
	    return max - min > 0 ? max - min : 0;
	};

	console.log(smallestRangeI([3,1,10], 4));
}();