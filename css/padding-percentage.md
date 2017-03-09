
当`padding`和`margin`取值是百分比的时候，相对的是其实是父元素的`width`。

在[W3C Editors's Draft](https://drafts.csswg.org/css-box/#margin-props)上这样定义的：

> Percentages: width of containing block; 
if the containing block is horizontal, otherwise the height

### 应用

在加载图片的时候，要保持图片的比例。

```html
<div class="container">
  <div class="img"></div>
</div>
```

```css
.container {
  width: 200px;
  height: 200px;
  border: 1px solid red;
}

.img {
  width: 100px;
  padding-top: 50%;
  background-color: #ccc;
}
```

这样有一个问题，就是max-height不能限制内容的高度。道理很简单，就是padding-top的高度不属于content。这个参考CSS盒模型。

### 改进

既然max-height是限制content的高度，那么我们就可以使用`:after`这样的伪类来填充content。问题就解决啦。

```css
.img:after {
    content: '';
    display: block;
    margin-top: 100%;
}
```

### 最终

在`.img`里，使用`absolute`给`img`标签定位即可。

```css
.img {
    position: absolute;
    top: 0;
    width: 100%;
}
```