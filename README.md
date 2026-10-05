[![Demo Pages](https://img.shields.io/badge/Demo‑Pages‑silent‑wolf‑site‑v2‑#222e3a?style=flat‑square)](https://cyberjason1.github.io/silent‑wolf‑site‑v2/)

> **眼睛会骗人。结构不会。**
> 纸条定稿：**又没好好吃饭？球踢得那么好，饭也要好好吃。——你的场外观众**

**《沉默之狼》Silent Wolf｜马来西亚华文独中写实校园足球·少年悬疑故事**

雨后积水的露天足球场，热带棕榈与老旧看台之间。
17岁中场陈知白拥有**结构视角**——推演赛场1‑3秒多种跑动概率，并非预知未来。
这份天赋带着记忆碎片化的代价，一部分由哥哥陈知白清醒且自愿承担。
被队友误解称作「影子」；历经球场的挣扎与羁绊，他终将成为「天狼」。

匿名纸条、胶片相机、暗处的观察者，以及只做远距离监视的神秘组织。
摒弃热血爽片叙事，讲述少年的孤独、亲情、遗憾与缓慢的自我接纳。
第一卷卷名：**看见结构的人**，开放结局，本卷无暴力冲突。

> A realistic sports‑mystery story set in a Malaysian Chinese independent high‑school.
> Seventeen‑year‑old midfielder Chen Zhibai wields **Structural Vision**: simulating probabilistic 1‑3‑second match‑movement paths instead of true precognition.
> Part of the ability’s heavy toll is voluntarily borne by his older brother Chen Zhiye.
> Labelled "the Shadow" by teammates, he gradually grows into "the Sirius".
> Volume 1 *The One Who Sees Structure*, open‑ended, no on‑screen violence.

🔗在线演示站点：https://cyberjason1.github.io/silent‑wolf‑site‑v2/

## 🧑‍🤝‍🧑核心角色
- **陈知白**｜17岁，校队8号中场，外号「影子」→「天狼」。**黑色短发发丝微遮右眼为专属标识**，性格寡言内敛；受记忆碎片化代价困扰。预告及开篇禁止完整正脸特写。
- **苏念**｜16岁转学生，图书馆管理员、校刊摄影。随身佩戴父亲遗留老式胶片相机；匿名纸条撰写人，感情线克制不狗血。
- **Ariff Aimran**｜46岁马来裔主队主教练。早年拥有结构视角，曾被神秘组织监视；退役回到华文独中，暗中观察保护陈知白。
- **陈知夜**｜**20岁，比陈知白大3岁，175cm / 62kg**，陈知白亲哥哥。清醒自愿承担天赋转嫁代价，拥有独立故事线；**禁止足球球衣、球鞋，头发绝不遮挡右眼，禁止双胞胎复刻陈知白**，第七章正式登场。AI图生图参考权重 `--iw 0.45‑0.55`，上限0.6。
- **Faris（法里斯）**｜17岁主队队长。前期质疑，称呼陈知白“影子”；后期理解信任队友，改称“天狼”。

## ⚠️ V6.0硬性创作铁则摘要
1. **结构视角属于主角内心概率推演，不是预知固定未来；多条半透淡白色分支轨迹，旁人不可见。禁止游戏UI、箭头、发光单线。**
2. 色调：冷青灰雨后阴天**单向平缓过渡到暖橙夕照，禁止色温来回跳变。**
3. 剪辑：全部柔和叠化，禁止硬切；慢动作仅限预告00:00‑00:05破水破门片段。
4. BGM：极简新古典钢琴+稀疏弦乐；禁用摇滚、EDM、史诗热血配乐。旁白为低声自语，拒绝朗诵腔。
5. 片尾规则：删除「第一章完。」；画面渐暗浮现金句，画面全黑之后再淡入冷墨白线版片名《沉默之狼》。
6. 神秘组织：第一卷仅远距离监视记录，严禁绑架、打斗、直接对峙冲突。
7. 陈知夜：拒绝被动受难工具人设定，登场后必须配置属于自身的独立叙事片段。

## 📁 仓库说明
> ⚠️ **本公开GitHub仓库仅存放沉浸式官网前端源码。完整IP档案docx文档、分镜脚本、AI提示词库、SRT字幕属于本地生产素材，不上传到公开仓库。**

silent‑wolf‑site‑v2/
├─ index.html          # 主页面
├─ style.css           # 全套样式
├─ main.js              # 环形角色、滚动交互 JS
├─ img/                 # 网站图片资源（海报、角色图；图片需自行 AI 生成放入）
├─ .github/workflows/   # Github‑Pages 自动部署配置
└─ README.md            # 本说明文档

```

### ✨网站功能特性
- Hero粘性视口，向下滚动驱动环形角色旋转浏览核心人物
- IntersectionObserver实现剧情区块进入视口自动淡入
- 右下角滚动触发悬浮角色小图
- 鼠标悬浮环形区域，显示「滚轮切换角色」弱提示
- 完整移动端响应式适配
- **无障碍兼容：系统开启「减少动态效果」，全部动画关闭，环形角色自动平铺静态展示**

## 🚀本地运行 & 部署
### 本地预览
```bash
git clone https://github.com/cyberjason1/silent‑wolf‑site‑v2.git
cd silent‑wolf‑site‑v2
```
直接双击打开`index.html`，**不需要后端服务器**。

### Github‑Pages 部署

仓库自带 workflow 配置，push 主分支后自动构建部署 Pages 站点。

## ✨核心金句

> 
> 眼睛会骗人。结构不会。
> 你踢你的。我看得见。
> 你往亮的地方踢。
> 我记得你就够了。
> 夜，我见过。你别来。
> 他不是影子。他是天狼。

## 📄 License

网站源码采用 MIT 协议。

> 
> IP 人设、故事、文案素材仅供个人学习、AI 参考演示，**禁止商用、二次改编。**

---

> 
> 配套本地生产包包含：V6.0 完整总档案、30 秒预告导演分镜、全套 AI 绘图 / 视频提示词、SRT 字幕、成片校验清单，仅本地留存，不提交公开仓库。

