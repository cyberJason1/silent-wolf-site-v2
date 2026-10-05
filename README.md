
# Silent‑Wolf‑Site‑v2｜沉默之狼 项目官网

> 眼睛会骗人，结构不会。

走进马来西亚华文独中少年足球悬疑世界。
沉浸式交互式人物环，每个角色拥有专属视觉体验，浏览故事、预告片与剧照。

🔗 **在线访问**：[https://cyberjason1.github.io/silent‑wolf‑site‑v2/](https://cyberjason1.github.io/silent-wolf-site-v2/)

## ✨ 网站功能特性
1. **电影感首页大屏**
SVG线条入场动画、鼠标跟随氛围光晕，快速带入故事氛围。
2. **故事世界观介绍**
短片背景、人物设定与项目信息卡片。
3. **先导预告播放**
HTML5原生视频播放器播放官方预告片。
4. **核心：3D交互式人物圆环**
- 立体圆环自动旋转；鼠标悬浮弹出角色台词气泡
- 点击角色打开人物详情弹窗
- 四位角色各自拥有独有的交互特效：网格线条、相机取景框、守护光圈、长按叙事效果
5. **剧照画廊**
项目剧照展示，图片加载失败自带文字兜底，不会页面崩溃。
6. **项目档案板块**
金句引用、世界观说明、素材下载入口。
7. **体验优化**
移动端自适应、滚动导航高亮、页面滚动进度条；支持系统「减少动画」无障碍模式。

## ⚙️ 实现原理
- **单文件架构**：HTML / CSS / JavaScript 全部内嵌于 `index.html`，无外部JS、CSS文件。部署简单，只需要网页文件+资源文件夹即可运行。
- **CSS**：CSS变量统一管理主题配色；`perspective` 透视实现3D圆环；CSS Animation实现全部动效。
- **原生JavaScript（无第三方库）**
  - `requestAnimationFrame` 驱动圆环旋转动画；
  - `IntersectionObserver`：人物区块进入屏幕可视区域才执行渲染，节约性能；
  - 实现角色弹窗、打字气泡、角色专属交互、滚动导航、进度条。
- **资源策略**：全部使用**相对路径**，适配GitHub‑Pages，避免404；
- **大视频处理**：mp4预告片使用 Git LFS 托管，防止Git仓库体积膨胀；
- **容错机制**：图片加载失败展示角色代号文字，页面不会直接空白。

## 📂 项目文件夹结构
```
silent‑wolf‑site‑v2/
├ index.html          # 主网页，HTML+CSS+JS全部在此文件
├ download.html       # 素材下载页面（待开发）
├ .gitignore          # Git忽略配置，过滤编辑器、系统垃圾文件
├ .gitattributes      # Git LFS配置，处理mp4大视频
└ assets/             # 全部静态资源
    ├ images/         # 图片总目录
    │   ├ cast/       # 人物圆环头像
    │   └ stills/     # 首页剧照、角色弹窗大图
    └ videos/         # 预告视频 trailer.mp4 (LFS管理)
```

> 规范：全部文件夹、文件名采用小写英文，不使用中文、空格，适配GitHub Pages大小写敏感。

## 🧪 本地开发运行
> 不要直接双击打开 index.html，会出现路径异常。

终端进入项目根目录执行：
```bash
python -m http.server 8000
```
浏览器访问：`[http://127.0.0.1:8000](http://127.0.0.1:8000)`

## 🚀 GitHub Pages部署
1. 将代码推送到 `master` 分支
2. 仓库 Settings → Pages
   - Source: `Deploy from a branch`
   - Branch: `master`
   - Folder: `/ (root)`
3. 保存，等待2‑5分钟部署完成，浏览器硬刷新 `Ctrl+Shift+R`

## 📝 Git关键命令参考
```bash
# 本地一次性初始化LFS（只需执行一次）
git lfs install
git lfs track "*.mp4"

# 提交变更示例
git add index.html script.js style.css
git commit -m "refactor: merge css+js into index.html, remove standalone script.js & style.css"
git push origin master
```

## 📌 已知维护提示
1. 人物圆环：只有人物区块滚动进入视口才会更新渲染；
2. 图片404只会显示兜底文字，不会造成角色框完全消失；
3. 视频mp4必须由Git LFS管理，不建议普通git提交。

## 📎 后续待做
- [ ] 完善 `download.html` 素材下载页面
- [ ] 图片批量转为webp，优化网页加载速度
- [ ] 可配置自定义域名
```

### 使用方法
1. 复制全部文本；
2. 在项目根目录新建文件，命名为 `README.md`；
3. 粘贴内容，把链接里面的 `你的用户名` 修改成你真实的github用户名；
4. git add README.md 提交push上传仓库。

如果你还需要，我可以把之前那份docx记录文档再精简一版。
