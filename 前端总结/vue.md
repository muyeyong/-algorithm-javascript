# vue常见问题

## v-if 和 v-show

v-if 是“真实的”按条件渲染，因为它确保了在切换时，条件区块内的事件监听器和子组件都会被销毁与重建。

v-if 也是惰性的：如果在初次渲染时条件值为 false，则不会做任何事。条件区块只有当条件首次变为 true 时才被渲染。

相比之下，v-show 简单许多，元素无论初始条件如何，始终会被渲染，只有 CSS display 属性会被切换。

总的来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。

## v-if和v-for同级别使用

v-if 比 v-for的优先级高

```vue
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
 bad
-->
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>

<!-- 
 good
-->
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    {{ todo.name }}
  </li>
</template>

```

## 组件通信

### provide 和 inject的原理是什么

虚拟节点对应一个实例对象，provide的时候会将这个属性绑定到实例对象上的`provides`上，inject的时候去访问当前实例对象的父亲，去取`provides`对应的属性，还需要注意的一点是，`provide/inject`的访问就像原型链一样，可以向上查找，所以在初始化实例对象的时候，`provides`属性需要继承其父节点的`provides`

