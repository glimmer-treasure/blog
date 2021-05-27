'use strict'
/**

//git commit message 规范格式

//Header
<type>(scope): <subject>
// 空一行
Body
// 空一行
Footer

-----------------------------------
Header 是必需的，注意冒号后面有空格，Body 和 Footer 可以省略。
Header：Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）
type：用于说明 commit 的类型，被指定在 commitlint.config.js 的 type-enum。
scope: 用于说明 commit 的影响范围，可以省略。
subject：subject 是 commit 目的的简短描述，不超过50个字符，且结尾不加句号（.）。
Body: body 部分是对本次 commit 的描述，可以分成多行

 **/

// type值解释
// build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
// ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
// docs：文档更新
// feat：新增功能
// merge：分支合并 Merge branch ? of ?
// fix：bug 修复
// perf：性能, 体验优化
// refactor：重构代码(既没有新增功能，也没有修复 bug)
// style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
// test：新增测试用例或是更新现有测试
// revert：回滚某个更早之前的提交
// chore：不属于以上类型的其他类型

// https://blog.csdn.net/y550918116j/article/details/81214746

module.exports = {
  extends: [ '@commitlint/config-conventional' ],
}
