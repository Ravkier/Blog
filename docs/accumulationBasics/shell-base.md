### shell （壳程序）
> 操作系统其实就是一组软件， 由于这组软件在控制整个硬件和管理系统得活动监测，使用者应用不当，被用户随意操作，将会使整个系统崩溃
#### Bash shell 的功能
+ 命令编修能力
  + 能记忆使用过的命令高达1000个，通过上下键
  + 命令会记录在 **.base_history** 中，~/.bash_history 记录的是前一次登陆以前所运行过的命令， 而至于这一次登陆所运行的命令都被缓存在内存中，当你成功的注销系统后，该命令记忆才会记录到 .bash_history 当中
+ 命令与文件补齐功能（Tab键）
  + 少打很多字
  + 确定输入的数据是否正确
  + 按Tab在一串命令的第一个字的后面，为命令补全
  + 按Tab在一串命令的第二个字以后时，为文件补全
+ 命令别名的配置（alias）
  + 命令 alias 命令可以替换一组命令
  + alias lm = 'ls -al' 查看所有文件包括隐藏文件 
+ 工作控制、前景背景控制（待补充）
+ 程序化脚本（待补充）
+ 通配符
  + X* : 已X开头的文件 * 为通配符
#### type命令
+ type [-t|p|a] name
  + 不传参数：type 会显示出 name 是外部命令还是 bash 内建命令
  + -t: 返回字段表示
    + file    ：表示为外部命令；
    + alias   ：表示该命令为命令别名所配置的名称；
    + builtin ：表示该命令为 bash 内建的命令功能；
  + -p: 如果后面接的 name 为外部命令时，才会显示完整文件名
  + -a: 会由 PATH 变量定义的路径中，将所有含 name 的命令都列出来，包含 alias
#### 命令下达
>  需要特别留意， Enter 按键是紧接着反斜杠 \ 的，两者中间没有其他字符。 因为 \ 仅跳脱『紧接着的下一个字符』而已
+  Enter 后，下一行最前面就会主动出现 > 的符号， 你可以继续输入命令, > 是系统自动出现的，不需要输入
