## flex布局

#### 容器属性：`Flex`容器有6个可用属性：

```
1. flex-direction
    决定主轴方向：flex-direction: row | row-reverse | column | column-reverse;

2. flex-wrap
    是否换行，如何换行：`flex-wrap: nowrap | wrap | wrap-reverse`;
3. flex-flow
    `flex-direction`属性和`flex-wrap`属性的简写形式：flex-flow: row nowrap;
4. justify-content
    定义`Flex`项目在主轴上的对齐方式：justify-content: flex-start | flex-end | center | space-between | space-around;
5. align-items
    定义`Flex`项目在交叉轴上如何对齐：align-items: flex-start | flex-end | center | baseline | stretch;
   ` baseline`：项目的第一行文字的基线对齐。
    `stretch`（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度
6. align-content
    定义多根轴线的对齐方式：align-content: flex-start | flex-end | center | space-between | space-around | stretch;
    如果项目只有一根轴线，该属性不起作用。
    `flex-start`：与交叉轴的起点对齐。
    `flex-end`：与交叉轴的终点对齐。
    `center`：与交叉轴的中点对齐。
    `space-between`：与交叉轴两端对齐，轴线之间的间隔平均分布。
    `space-around`：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    `stretch`（默认值）：轴线占满整个交叉轴。
```

#### 项目属性：`Flex`项目有6个可用属性：

```
1. order
    定义项目的排列顺序。数值越小，排列越靠前，默认为0：order: <integer>;
2. flex-grow
    定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大: flex-grow: <number>;
    如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。
    如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
3. flex-shrink
    定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小: flex-shrink: <number>;
    如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
    如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
    负值对概述行无效。
4. flex-basis
    定义了在分配多余空间之前，项目占据的主轴空间（main size）: flex-basis: <length>;
    浏览器根据这个属性，计算主轴是否有多余空间。
    它的默认值为auto，即项目的本来大小。
    可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
5. flex
     flex属性是flex-grow, flex-shrink 和 flex-basis的简写，后两个属性可选: flex: none | <> | <>;
    该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
    建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
6. align-self
    允许单个项目有与其他项目不同的对齐方式: align-self: auto | flex-start | flex-end | center | baseline | stretch;
    默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```

## css3新特性

transition 

transform

animation

https://github.com/febobo/web-interview/issues/106

## 实现水平垂直居中

https://vue3js.cn/interview/css/center.html#%E4%BA%8C%E3%80%81%E5%AE%9E%E7%8E%B0%E6%96%B9%E5%BC%8F

- 利用定位+margin:auto
- 利用定位+margin:负值
- 利用定位+transform
- table布局

​	设置父元素为`display:table-cell`，子元素设置 `display: inline-block`。利用`vertical`和`text-align`可以让所有的行内块级元素水平垂直居中

- flex布局
- grid布局

## css盒模型

分为content-box 和 border-box

context-box只包含内容， border-box包含内容border margin 和 content

## BFC 块级格式化上下文

独立的渲染区域，有一套渲染规则

触发BFC

​	根元素

​	浮动元素 

​	绝对定位元素

​	display: inline-block 、flex、 table-cell

​	overflow指定除visible外

​	特点：

​		同一个bfc内的块级元素的上下margin会发生重叠

​		bfc不会与浮动区域的元素区域重叠

​		bfc是一个独立的容器，容器内的子元素不会影响到外面的元素

​	使用：

​		解决外边距折叠问题

​		制作两栏布局（左边宽度固定 右边自适应）

​		清除浮动： 这里清除浮动的意思并不是清除你设置的元素的浮动属性，而是清除设置了浮动属性之后给别的元素带来的影响。例如我们给子元素设置浮动，那么父元素的高度就撑不开了。

## flex布局的缺点
    浏览器兼容问题，只能兼容到ie9
