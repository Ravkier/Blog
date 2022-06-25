#### AST解析
什么是AST解析呢，vue中渲染时，是渲染的 `虚拟dom` ，虚拟dom就是通过AST解析获得，
> ATS解析：简单来说就是把字符串转换成一个对象的过程，这个庞大的对象就是虚拟dom
#### 开始编译的函数
```js
    function compileToFunction(template, options = {}) {
        const { code } = baseCompile(template, options);
    }
```
> baseCompile: 基础编译函数 template 准备别编译的字符串

#### baseCompile

 在基础编译中 先调用 `baseParse` 函数把template转成 ast

```js
export function baseCompile(template, options) {
  // 1. 先把 template 也就是字符串 parse 成 ast
  const ast = baseParse(template);
  // ...
}
```
#### baseParse => ast (核心)

```js
    export function baseParse(content: string) {

        const context = createParserContext(content);

        return createRoot(parseChildren(context, []));
    }
```


开始执行的时候 先创建 `parseContext`，解析mini-vue时，使用到包括 `source` 这个属性

```js
    function createParserContext(content) {
        console.log("创建 paserContext");
        return {
            source: content,
        };
    }
```

返回值中 调用`createRoot`的第一个参数就是`parseChildren`函数的返回值， `parseChildren`方法就是开始解析模板了，
> createRoot
```js 
    function createRoot(children) {
        return {
            type: NodeTypes.ROOT,
            children,
            helpers: [],
        };
    }
```

- `isEnd`方法 判断是否还有没有字符串 有就继续执行
- `parseInterpolation` 处理插值表达式
- `parseTag` 标签解析
- `parseElement` 元素解析
- `parseText` 文本解析

> tips: while 循环比for循环更快，所以源码里面很多都是在用while

> parseChildren
```js
    function parseChildren(context, ancestors) {
        console.log("开始解析 children");
        const nodes: any = [];

        while (!isEnd(context, ancestors)) {
            let node;
            const s = context.source;

            if (startsWith(s, "{{")) {
                // 看看如果是 {{ 开头的话，那么就是一个插值， 那么去解析他
                node = parseInterpolation(context);
            } else if (s[0] === "<") {
                if (s[1] === "/") {
                    // 这里属于 edge case 可以不用关心
                    // 处理结束标签
                    if (/[a-z]/i.test(s[2])) {
                    // 匹配 </div>
                    // 需要改变 context.source 的值 -> 也就是需要移动光标
                    parseTag(context, TagType.End);
                    // 结束标签就以为这都已经处理完了，所以就可以跳出本次循环了
                    continue;
                    }
                } else if (/[a-z]/i.test(s[1])) {
                    node = parseElement(context, ancestors);
                }
            }

            if (!node) {
                node = parseText(context);
            }

            nodes.push(node);
        }

        return nodes;
    }
```

> isEnd: 判断字符串还有没有剩余
```js
    function isEnd(context: any, ancestors) {
            // 检测标签的节点
            // 如果是结束标签的话，需要看看之前有没有开始标签，如果有的话，那么也应该结束
            // 这里的一个 edge case 是 <div><span></div>
            // 像这种情况下，其实就应该报错
            const s = context.source;
            if (context.source.startsWith("</")) {
                // 从后面往前面查
                // 因为便签如果存在的话 应该是 ancestors 最后一个元素
                for (let i = ancestors.length - 1; i >= 0; --i) {
                if (startsWithEndTagOpen(s, ancestors[i].tag)) {
                    return true;
                }
                }
            }

            // 看看 context.source 还有没有值
            return !context.source;
    }
```

> startsWithEndTagOpen: 工具函数 => 判断开始和结束的标签是否闭合
```js
    function startsWithEndTagOpen(source: string, tag: string) {
        // 1. 头部 是不是以  </ 开头的
        // 2. 看看是不是和 tag 一样
        return (
            startsWith(source, "</") &&
            source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase()
        );
    }
```

> startsWith: 工具函数 => 判断 source 中 searchString 是不是在索引首位
```js
function startsWith(source: string, searchString: string): boolean {
  return source.startsWith(searchString);
}
```

> parseInterpolation(解析ast核心之一): 插值 '{{' '}}'处理
```js
function parseInterpolation(context: any) {
  // 1. 先获取到结束的index
  // 2. 通过 closeIndex - startIndex 获取到内容的长度 contextLength
  // 3. 通过 slice 截取内容

  // }} 是插值的关闭
  // 优化点是从 {{ 后面搜索即可
  const openDelimiter = "{{";
  const closeDelimiter = "}}";

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    openDelimiter.length
  );

  // TODO closeIndex -1 需要报错的

  // 让代码前进2个长度，可以把 {{ 干掉
  advanceBy(context, 2);

  const rawContentLength = closeIndex - openDelimiter.length;
  const rawContent = context.source.slice(0, rawContentLength);

  const preTrimContent = parseTextData(context, rawContent.length);
  const content = preTrimContent.trim();

  // 最后在让代码前进2个长度，可以把 }} 干掉
  advanceBy(context, closeDelimiter.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content,
    },
  };
}
```

> parseTextData(解析某个变量或数据): 
```js
function parseTextData(context: any, length: number): any {
  console.log("解析 textData");
  // 1. 直接返回 context.source
  // 从 length 切的话，是为了可以获取到 text 的值（需要用一个范围来确定）
  const rawText = context.source.slice(0, length);
  // 2. 移动光标
  advanceBy(context, length);

  return rawText;
}
```

> advanceBy: 截取字符串，切掉已经解析的字符串
```js
function advanceBy(context, numberOfCharacters) {
  console.log("推进代码", context, numberOfCharacters);
  context.source = context.source.slice(numberOfCharacters);
}
```

> parseTag: (核心之一 tag 的解析) => 通过参数type来判断是开始标签还是结束标签，
```js
function parseTag(context: any, type: TagType): any {
  // 发现如果不是 > 的话，那么就把字符都收集起来 ->div
  // 正则
  const match: any = /^<\/?([a-z][^\r\n\t\f />]*)/i.exec(context.source);
  const tag = match[1];

  // 移动光标
  // <div
  advanceBy(context, match[0].length);

  // 暂时不处理 selfClose 标签的情况 ，所以可以直接 advanceBy 1个坐标 <  的下一个就是 >
  advanceBy(context, 1);

  // 结束标签时，要进行结束，不返回对象，因为开始标签返回的对象，
  // 结束标签要进入这个函数就是为了推进代码
  if (type === TagType.End) return;

  let tagType = ElementTypes.ELEMENT;

  return {
    type: NodeTypes.ELEMENT,
    tag,
    tagType,
  };
}
```

> parseElement(核心！！ 元素解析，递归所在) => 数据结构栈的应用，和递归
```js
function parseElement(context, ancestors) {
  // 应该如何解析 tag 呢
  // <div></div>
  // 先解析开始 tag
  const element = parseTag(context, TagType.Start);

  ancestors.push(element);
  const children = parseChildren(context, ancestors);
  ancestors.pop();

  // 解析 end tag 是为了检测语法是不是正确的
  // 检测是不是和 start tag 一致
  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.End);
  } else {
    throw new Error(`缺失结束标签：${element.tag}`);
  }

  element.children = children;

  return element;
}
```

> parseText(核心解析文本，文本中是否掺杂插值，只解析文本，要到插值结束，并切去文本继续执行): 
```js
function parseText(context): any {
  console.log("解析 text", context);

  // endIndex 应该看看有没有对应的 <
  // 比如 hello</div>
  // 像这种情况下 endIndex 就应该是在 o 这里
  // {
  const endTokens = ["<", "{{"];
  let endIndex = context.source.length;

  for (let i = 0; i < endTokens.length; i++) {
    const index = context.source.indexOf(endTokens[i]);
    // endIndex > index 是需要要 endIndex 尽可能的小
    // 比如说：
    // hi, {{123}} <div></div>
    // 那么这里就应该停到 {{ 这里，而不是停到 <div 这里
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }

  const content = parseTextData(context, endIndex);

  return {
    type: NodeTypes.TEXT,
    content,
  };
}
```

#### 总结
- parseChildren方法主要是通过while循环边解析边裁剪，直到模版字符串全部解析完成
- 通过正则表达式对解析的字符串进行分类，主要是HTML标签、动态数据、静态文本三类
- HTML标签中的子元素会继续调用parseChildren方法进行深度解析，之后赋值给children属性
- HTML标签中属性也会通过while循环(正则表达式判断)解析所有的属性(指令、数据、事件),最后生成属性对象，再push到props属性数组中(mini-vue中没有进行属性的处理)。



