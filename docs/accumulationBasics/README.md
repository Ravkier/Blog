### 计算机基础
#### 计算机硬件得组成部分
+ 外观分析来看，包括三部分
  + 输入单元：键盘鼠标等
  + 主机部分：属于系统单元，包括CPU，主内存等
  + 输出单元：显示器等能接受知识的元件

#### 元件之间的配合
> CPU内又可分为两个主要单元：控制单元和算数逻辑单元， 其中算数逻辑单元主要负责程序运算与逻辑判断，控制单元则主要协调各个周边组件和各个单元间的工作
- 首先，输入单元，进入到主内存。
- 主内存的数据传入CPU中算术逻辑单元，该单元处理完数据后也会传输给主内存 **（基本上数据都是通过主内存再转出去的，至于数据会流进/流出内存则是CPU所发布的控制命令，而CPU实际要处理的数据则完全来自于主内存）**
- 最后从主内存中输出到输出单元

#### CPU的种类
> 两种： 1、精简指令集 2、复杂指令集
1. 精简指令集（RISC）
   1. 指令的执行时间很短，完成的动作也很单纯，执行效能较佳
   2. 目前使用范围最广的CPU是ARM（各厂牌手机、PDA、导航系统、网络设备(交换器、路由器等)等）
2. 复杂指令集（CISC）
   1. 每个小指令可以执行一些 **较低阶的硬件操作**，**数目多而且复杂**， **每条指令的长度并不相同**
   2. CPU主要有AMD、Intel、VIA等的x86架构的CPU。

#### 主机板上的周边设备
+ 储存装置：硬盘，软盘，光盘
+ 显示装置：显示卡与显示的精致度、色彩与解析度都有关系
+ 网络装置：网络卡

#### 运作流程
+ CPU = 大脑中枢：都是通过大脑来进行判断与控制身体各部分的活动
+ 主内存 = 大脑记录区域：能够将与外界的互动暂时记录起来，提供CPU来进行判断
+ 硬盘 = 大脑的记忆区域：将重要的数据储存起来，以便未来能够使用
+ 主机板 = 神经系统：将所有的元件进行连接，然后CPU下发命令，传递给各个元件执行
+ 各项周边设备 = 人体与外界沟通的手、脚、皮肤、眼睛等：是与外界互动的关键
+ 显示卡 = 脑中生成的影像：来自眼睛的刺激转成影响后在脑袋中呈现，所以显示卡所产生的数据来源也是CPU控制的。
+ 电源 = 心脏：如果不供电，其他元件不能使用，就相当于心脏的作用。
> 如果要使用硬盘中的数据，数据也要先进入主内存，再有主内存提交到CPU进行判断。

#### 计算机上常用的单位
1. 容量单位
  + 二进制：
    + bit -> Byte => 1Byte = 8bits
    + K -> 1K = 1024
    + M -> 1M = 1024K
    + G -> 1G = 1024M
    + T -> 1T = 1024G
    + p -> 1P = 1024T
2. 速度单位
  + 网络常使用的单位为 Mbps，即每秒多少MBit
  + 十进制 Hz就是秒分之一
    + 1KHz = 1000
    + 1MHz = 1000KHz
    + 1GHz = 1000MHz
    + 1THz = 1000GHz
    + 1PHz = 1000THz


