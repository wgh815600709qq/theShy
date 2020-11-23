// 组件定义配置

 /**
  * @title 类型
  * @list [主要，次要，新增， 成功，警告，错误]
  */
 export const enum Type { 
    Main = 'main', 
    Sec = 'secondary',
    New = 'new',
    Suc = 'success',
    Ale = 'alert',
    Err = 'error'
 }

 /**
  * @title 大小
  * @list [大，中, 小]
  */
 export const enum Size {
    Big = 'big',
    Mid = 'middle',
    Sma = 'small'
}

/**
 * @title 形状
 * @list [默认, 椭圆, 圆]
 */
export const enum Shape {
    Def = 'default',
    Ell = 'ellipse',
    Cir = 'circular'
}
