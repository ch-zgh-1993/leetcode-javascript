/*
* @Author: Zhang Guohua
* @Date:   2020-04-22 17:36:43
* @Last Modified by:   zgh
* @Last Modified time: 2020-04-23 11:18:55
* @Description: create by zgh
* @GitHub: Savour Humor
*/

// 题目:
// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。 给定的 n 保证是有效的。

// 示例：
// 给定一个链表: 1->2->3->4->5, 和 n = 2. 当删除了倒数第二个节点后，链表变为 1->2->3->5.


// 题意分析:
// 1. 定义为单链表，给定参数为链表的第一个节点。 删除倒数第 n 个节点。
// 2. 从头查询，查询到最后一个节点，再倒推到要删除的节点，进行删除操作。
// 3. 进阶： 使用一趟扫描实现。


// 思路：
// 1. 正常思路: 建立查询函数，查询到最后，将链表内容存储起来，再进行指针修改，删除节点。
// 2. 官方- 一次遍历法：  




// 思路1: 100ms 9.3%; 34.1mb 87.5%；
// 注意前边界即可。链表为 null 时，返回为 null

var removeNthFromEnd1 = function(head, n) {
	let arr = []
	while (head.next) {
		arr.push(head)
		head = head.next
	}
	arr.push(head)
	if (n === arr.length) {
		if (arr.length > 1) return arr[1]
		return null
	}
	arr[arr.length - n - 1].next = arr[arr.length - n + 1] || null
	return arr[0]
};


// 思路2: 68ms 76.73%; 34mb 100%
// 循环时一次循环，存储的话，没有用到数组，只是一些变量指针存储。

var removeNthFromEnd = function(head, n) {
	let res = new ListNode(0)
	res.next = head
	let fr = res
	let se = res
	for (let i = 1; i <= n + 1; i++) {
		fr = fr.next
	}
	while(fr) {
		fr = fr.next
		se = se.next
	}
	se.next = se.next.next
	return res.next
};




// 测试用例

function ListNode(val) {
	this.val = val
	this.next = null
}

let t1 = new ListNode(1)
let t2 = new ListNode(2)
t1.next = t2
let t3 = new ListNode(3)
t2.next = t3
let t4 = new ListNode(4)
t3.next = t4
let t5 = new ListNode(5)
t4.next = t5

console.log(removeNthFromEnd(t1, 2))