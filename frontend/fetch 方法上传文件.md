# fetch 方法上传文件

例子：

```html
<input id="image-file" type="file" name="wanger" />
<button onclick="upload()">上传</button>
<script>
  const upload = async () => {
    let photo = document.getElementById("image-file").files[0];
    let formData = new FormData();
    formData.append("file", photo);
    fetch('http://localhost:3001/v1/articles/upload', { method: "POST", body: formData })
  }
</script>
```
