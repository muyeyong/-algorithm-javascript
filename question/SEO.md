## html 网页优化
1: <title> title </title>，title一般不超过80个字符，用英文分隔符-，简单明了
2：meta description，不超过150个字符，描述页面内容
3：meta keywords，一般不超过3个关键字，用英文分隔符, 
4: 使用语义化的标签（header article section aside footer nav），少使用div span无语义化的标签
5: 非装饰性的图片使用alt描述
6：提高网页渲染速度，使用服务端渲染

## 服务端渲染
如果不使用服务端渲染的流程是怎样的？
单页应用最开始的页面只有一个挂载点，没有实质性的内容，不利于seo优化
首先会现请求js脚本的内容，执行js代码，数据接口请求和渲染才能看到页面

渲染过程：
1：react主要是使用ReactDomServe.renderToString将react组件转换成字符串，有一个需要注意的问题是，renderToString如果传入函数组件的话，会报错，可以用React.createElement(<App />) 处理

2：通过模板引擎将数据组装进去，返回给客户端

3：客户端最终还是需要引用react的打包结果，使页面具有可交互的能力，其中数据会挂载到window对象上，不需要重复请求数据

