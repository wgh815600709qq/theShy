// 系统基础类型定义
export const stringTuple = <T extends string[]>(...args: T): T => args;

export const numberTuple = <T extends number[]>(...args: T): T => args;

