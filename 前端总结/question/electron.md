## 上传 下载 文件同步 本地文件

实例化aliyunoss 和 minio，传入秘钥，通过他们提供的api进行文件在下载上传

下载是以数据流的形式进行的，需要创建一个文件流：const stream =  fs.createWriteStream   下载流.pipe(stream)

上传通过传入回调事件，获取上传的信息
观察者模式：触发相应的事件

## electron 基础

electron 是网页应用的原生包装层，在node环境中运行

```js
//app模块：控制程序的事件生命周期

// BrowserWindow模块：创建和管理应用程序窗口

new BrowerWindow({
  webPreferences: {
    preload: // 引入预加载脚本
  }
})
```

### 进程模型

#### 主进程

​	主进程是单一的，在node环境中运行，有require和使用nodejs api的能力。

​	主进程的主要目的是使用BrowserWindow 模块创建和管理应用程序窗口

```js
// 主进程用 window 的 webContent 对象与网页内容进行交互。
const win = new BrowserWindow({})
const contents = win.webContents
```

#### 渲染进程

​	渲染网页内容

#### preload脚本

​	运行在渲染进程，但是能访问node api

​	通过 contextBridge.exposeInMainWorld 将node中的逻辑 or变量暴露到浏览器中

​	ipcRenderer还可以进行进程间的通信

### 快捷键

```
munu 可以通过accelerator 指定快捷键，注意平台差异
引入globalShortcut  ==> const { globalShortcut } = require('electron')
globalShortcut.register('快捷键', () => {

})
```

### 拖拽

[`webContent.startDrag(item)`](https://www.electronjs.org/zh/docs/latest/api/web-contents#contentsstartdragitem) 

### 通知

 Notifications, 可以直接在渲染线程使用

## electron 打包发布流程

通过electron-forge打包分发文件

## electron 通信

渲染进程到主进程：

​	单向：

​		ipcRenderer.send 发送消息   ipcMain.on 接受消息

​	双向：

​		ipcRenderer.invoke 发送消息   ipcMain.handle 处理消息

主进程到渲染进程：

​		主进程通过mainWindow.webContents.send('name', value) 发送消息给渲染进程，其实是执行渲染进程的回调函数

​		预加载脚本通过暴露callback =>  ipcRenderer.on('name', callback)，接收渲染进程回调

​		渲染进程注册回调，可以通过回调的第一个参数 event.sender.send() 给主进程发送消息

渲染进程 到 渲染进程

 	   将主进程作为渲染器之间的消息代理。 这需要将消息从一个渲染器发送到主进程，然后主进程将消息转发到另一个渲染器。

 	   从主进程将一个 [MessagePort](https://www.electronjs.org/zh/docs/latest/tutorial/message-ports) 传递到两个渲染器。 这将允许在初始设置后渲染器之间直接进行通信。

## 消息端口

new MessageChanel() 创建MessagePort(port1 和 port2 )

通过ipcRenderer.postMessage 传递端口，ipcMain.on 接收MessagePort对象

1>在渲染进程创建messagePort 发送到主进程进行通信

2>主进程创建messagePort 让两个渲染进程进行通信

## electron 版本更新

​	



## 文件监听实现

 etag

## aliyunoss 和 minio