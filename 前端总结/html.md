# 前端总结：
## 移动端1px适配问题： 为什么只有1px有问题？
    现象：在移动端上定义1px，但实际效果比1px长，高分辨屏通过多个像素点合成一个像素点。
    解决办法： 
    通过写小数配合媒体查询实现
    使用flexible.js 动态设置 viewport
    使用伪类 + transform实现

## CSS布局

+ 文档布局

  块级元素独占一行，行内元素共享一行

+ 浮动布局

  通过float布局

+ 定位布局

  通过position布局

  ​	absolute: 绝对定位

  ​	position: 相对定位

  ​	fixed: 固定定位

  ​	static: 粘性定位

+ flex布局

  使用display: flex，进行布局

  ​	父容器属性： 

  ​		flex-direction: row、 column、 row-reverse、column-reverse，控制主轴方向，默认 row

  ​		flex-wrap: wrap , no-wrap，控制是否换行，默认 no-wrap

  ​		flex-flow : flex-direction 和 flex-wrap 的组合

  ​		justify-content: flex-end, flex-start, center , space-around, space-between，控制主轴元素排列方式

  ​		align-items:	控制交叉轴单行元素排列方式

  ​		align-content:  控制交叉轴多行元素（多根轴线）排列方式

  ​	子容器属性：

  ​		order：定义项目的排列顺序，数字越小，排列越靠前，默认为0

  ​		flex-grow: 定义项目的放大比例，默认为0，不放大

  ​		flex-shrink: 定义项目的缩小比例，默认为1，如果空间不足，项目将缩小，负值对改属性无效

  ​		flex-basis: 定义在分配多余空间的时候，项目占据的主轴空间，默认是auto，及项目本身的大小，如果写成固定的值（300px），则项目占据固定空间

  ​		flex: 是 flex-grow、flex-shrink、flex-basis 的缩写，默认值为 **0 1 auto**，后两个属性可选，提供两个快捷值： auto （ 1 1 auto） none （0 0 auto）

  ​		align-self：允许单个项目有与其他项目不同的对其方式，可覆盖align-items属性，默认为auto

+ grid布局

+ 水平垂直居中

  水平居中：

  ​		绝对定位；flex布局； grid布局；

  ​		块级元素：margin: 0 auto (有固定的宽度); 

  ​		行内元素：text-align: center; 

  垂直居中：

  ​		绝对定位；flex布局；grid布局；

  ​		行内元素： line-height; 

  文字 和 图片居中： 使用 vertical-align: middle; 只适用于行内元素

+ 圣杯布局：margin 负值的应用，可以使用flex代替

+ 双飞翼布局： margin 负值的应用，可以使用flex代替

## 元素

行内块元素: span i 

块级元素： div  section  main  ul  li  p  h1-h6