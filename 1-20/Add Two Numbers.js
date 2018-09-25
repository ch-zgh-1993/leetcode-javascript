/*
* @Author: Zhang Guohua
* @Date:   2018-09-21 19:05:38
* @Last Modified by:   zgh
* @Last Modified time: 2018-09-25 12:52:40
* @Description: create by zgh
* @GitHub: Savour Humor
*/

// 题目：
// 给定两个非空链表来表示两个非负整数。位数按照逆序方式存储，它们的每个节点只存储单个数字。将两数相加返回一个新的链表。
// 你可以假设除了数字 0 之外，这两个数字都不会以零开头。
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
// 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// var addTwoNumbers = function(l1, l2) {
    
// };



// 题意分析：
// 	1. 非空链表，非负整数，一个节点一个数字
// 	2. 除非为0，否则首位不为0
// 	

// 思路：
// 
// 尝试思路：
// ---若是单链表，则需要找出每一个值，存储在 arr 中，再将两个 arr 相加。但打印出来是数组list。
// ---最直接的方法，创建第三个list，以长度较大的作为循环长度，倒序相加，将至存在第三个list中，若相加超过10，则可临时存储，在下次求和时加上，清空临时值，再判断即可。加完后对第
// 三个 list 求反即可。 但是返回的是 [], 因为给的并不是数组，而是对象.....能不能不要这么误导...一波三折
// 
// 1. 给出的是一个对象，那么将值存放在arr中，创建第三个list，再返回对象。
// 

function ListNode(val) {
    this.val = val;
    this.next = null;
 }
// 解答：
// ---错误理解
// 
!function(){

	var addTwoNumbers = function(l1, l2) {
		let l3 = [];
		let len = l1.length > l2.length ? l1.length : l2.length;
		let add = false;
		for(let i = len-1; i >= 0; i--){
			let temp = l1[i] + l2[i];
			if(add){
				temp += 1;
				add = false;
			}
			if(temp < 10){
				l3.push(temp);
			}else{
				l3.push(temp - 10);
				add = true;
			}
		}
		return l3;
	};

	console.log(addTwoNumbers([2,4,3], [5,6,4]));
}();


// 1. 
// 下面有一个地方的代码是奇怪的。。可以优化的。
// 用时： 188ms，50.3%
// 
!function(){
	var addTwoNumbers = function(l1, l2) {
		let result;
		function parseP(obj, result){
			result.push(obj.val);
			if(obj.next === null){
				return result;
			}else{
				return parseP(obj.next, result);
			}
		}
		let a1 = parseP(l1, []);
		let a2 = parseP(l2, []);

		let len = a1.length > a2.length ? a1.length : a2.length;
		let add = false;
		let tempNode = null;
		for(let i = 0; i < len; i++){
			if(a1[i] === undefined) a1[i] = 0;
			if(a2[i] === undefined) a2[i] = 0;
			let temp = a1[i] + a2[i];
			if(add){
				temp += 1;
				add = false;
			}
			//  这段判断是可以优化的。
			if(result === undefined){
				if(temp < 10){
					result = new ListNode(temp);
				}else{
					result = new ListNode(temp - 10);
					add = true;
				}
				tempNode = result;
			}else{
				if(temp < 10){
					tempNode = tempNode.next = new ListNode(temp);
				}else{
					tempNode = tempNode.next = new ListNode(temp - 10);
					add = true;
				}
			}
		}
		// 若最高位相加超过10时。
		if(add === true){
			tempNode.next = new ListNode(1);
		}

		return result;
	};

	console.log(addTwoNumbers({
		val: 5,
		next: null
	}, {
		val: 5,
		next: null
	}));

	console.log(addTwoNumbers({
		val: 2,
		next: {
			val: 4,
			next: {
				val: 3,
				next: null
			}
		}
	}, {
		val: 5,
		next: {
			val: 6,
			next: {
				val: 4,
				next: null
			}
		}
	}));
}();