## vuex
    state
    mutation
    action
    getter
包含四个部分，只能通过mutation触发改变state，mutation实际触发action改变state

## pinia
    state -> ref
    action -> function
    getter -> computed
包含三个部分，state可以被ref取代，action可以被function取代， getter可以被computed取代，用这种方式的话，最终return你需要暴露的方法就好。

## vuex跟pinia对比
1: 抛弃了mutation，mutation的作用是记录数据更新，可以实现时间旅行。pinia的action支持同步和异步，就不需要了。
2: ts更好的支持。
3: 支持optionAPI 和 componentAPI。
4: 更加简洁。