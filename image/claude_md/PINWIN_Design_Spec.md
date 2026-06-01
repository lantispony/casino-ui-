# PINWIN — 設計規格文件
> 最後更新：2026年6月1日｜此文件為討論記錄，供新視窗接續使用

---

## 一、設計系統（Design System v2.1）

### 字體規範（5種）

| 字體 | 用途 |
|---|---|
| Cinzel Decorative w900 | Logo、Win Overlay、Poster大標題、遊戲頁大標題 |
| Raleway w600 | 區塊標題、Badge標籤、卡片副標、表單欄位標籤、Footer欄標 |
| Inter w400–700 | 所有UI正文、分類名稱、遊戲卡標題、表格欄標、tier badge、結果訊息、footer、auth表單 |
| Playfair Display w700 | "Play now"按鈕文字、排行榜/Winners表格的玩家名稱 |
| Rajdhani w700 tabular-nums | 所有數字（無例外）：Jackpot、倒數計時、餘額、投注額、賠付、倍率、遊戲結果 |

**規則：**
- 所有字體可依場景調整 font-weight，但 font-family 不可在其指定角色內改變
- 數字統一 .toFixed(2) 顯示
- 混合文字+數字時（如"$300 AND 30 FS"），數字用 Rajdhani，周圍文字依其自身規則

---

### 顏色規範

| 用途 | 色值 |
|---|---|
| 金色漸層（按鈕、邊框、logo shimmer） | #FFF5C0 → #FFE066 → #F5C518 → #D4A017 → #B8860B → #8B6508 → #5C4000 → #2A1A00（8-stop, 135deg）|
| 數字專用色 | #FFE066（flat，不用漸層）|
| 邊框色 | rgba(245,197,24,.5) |
| 預設文字（淺黃） | #FFF5C0 |

---

## 二、Header

### Logged OUT 狀態
```
[Logo在Sidebar] ··· [Login] [Sign Up] [Avatar]
```

### Logged IN 狀態
```
[Logo在Sidebar] ··· [Balance] [+] [搜索框] [Avatar]
```

### 各元件規格

**Balance box：**
- 格式：$00,000,000.00
- 字體：Rajdhani w700，顏色 #FFE066
- 背景：透明
- 邊框：1px solid rgba(245,197,24,.5)，border-radius 8px
- Label "BALANCE"：Inter 9px rgba(255,255,255,.35)

**儲值(+)按鈕：**
- 尺寸：34×34px，border-radius 8px
- 樣式：透明背景，邊框 1px solid rgba(245,197,24,.5)
- 內容："+" 金色漸層文字

**搜索框：**
- 顯示條件：登入後才出現
- 位置：儲值(+)按鈕右方
- 狀態：一直展開
- 造型：圓角輸入框＋放大鏡圖示（一般搜索引擎樣式）

**注意：**
- Header左側的 Casino/Sport/Favorites 三個pills已移除

---

## 三、Sidebar

- 寬度：200px，always visible
- Logo位置：Sidebar最上方，使用**橫版Logo**（S圖形＋SPINWIN文字左右排列）

### 結構：Main item（icon + label，always expanded）+ Sub items（縮排，Inter，無icon）

```
🎰 Game
   - Live Casino
   - Slots
   - Table Games
   - Roulette
   - Poker        ← 新增
   - Sic Bo       ← 新增

⚽ Sport
   - Football
   - Basketball
   - Tennis
   - Esports

👑 VIP Club
   - Daily Bonus
   - Welcome Bonus
   - Shop
   - History
   - Rank
   - Profile

⭐ Favorites（唯一可收合項目，預設展開）
   - （假資料遊戲名稱）
```

**所有其他主項目：always expanded，不可收合**
Future：考慮加入全部收合toggle

---

## 四、首頁（Home Page）結構

### 4-1 Jackpot 橫條
- 位置：Header下方，內容區最頂部（Sidebar右側）
- 寬度：內容區全寬（不含Sidebar）
- 樣式：外框由設計師提供，程式只負責數字跑動
- 數量：目前1個，之後擴充
- 數字動畫：持續跑動累積，無發光特效
- 字體：Rajdhani w700，顏色 #FFE066

### 4-2 上方 Promo Banner（3張）
- 3張橫向寬卡並排
- 整張卡片可點擊
- 點擊行為：跳出**註冊** Modal
- 內容主題：
  1. 註冊領獎勵 CTA（Sign Up Bonus）
  2. 熱門遊戲活動（容易中大獎）
  3. 儲值優惠
- 版面：透明人物素材＋文字排版（設計師提供素材）
- 手機版：1次1張，左右輪播

### 4-3 分類卡片按鈕（6個）
分類清單：
1. Live Casino
2. Slots（預設選中）
3. Table Games
4. Roulette
5. Poker
6. Sic Bo

**互動狀態：**

| 狀態 | 背景 | 文字 | Border | 特效 |
|---|---|---|---|---|
| 預設 | 透明 | #FFF5C0 | 金色線框 | — |
| Hover（桌機） | 透明 | #FFF5C0 | Border Glow | 圖片提亮 |
| Press（全平台） | — | — | — | 中心縮小 |
| 選中 | #FFF5C0→#FFE066漸層 | 黑色 | 金色線框 | — |

**注意：取消放大位移效果（Poster類卡片也同樣取消）**

### 4-4 遊戲區塊
- 標題動態變化：`SLOT GAMES (32)` / `ROULETTE GAMES (8)` 等，括號顯示該分類**總數**
- 移除 "ALL GAMES" 標題
- 移除重複的遊戲列表

**遊戲Tag分類系統：**
每款遊戲有一個或多個Tag，切換分類顯示對應Tag的遊戲：

| 遊戲範例 | Tags |
|---|---|
| 老虎機A | slots |
| 歐式輪盤 | roulette, table |
| 21點 | table |
| 百家樂 | table, live-casino |
| 骰盅/Sic Bo | table, sic-bo |
| 德州撲克 | poker |

**View More 按鈕：**
- 文字：`View More ∨`
- 造型：矩形倒圓角
- 位置：遊戲最後一排下方，橫向置中
- 行為：每按一次多顯示2排；無更多時消失
- 互動：Hover → Border Glow，Press → 略縮小
- 樣式：btn-ghost（金色線框，透明背景）

### 4-5 Winners Today 表格
**欄位（移除Icon欄，新增Game Name欄）：**

| Player | Bet | Payout | Multiplier | Game Name |
|---|---|---|---|---|
| 頭像+ID | 0.50 | 150.00 | ×300.00 | Slots King |

- 頭像：圓形裁切，設計師提供照片素材
- Player名稱：Playfair Display
- 數字欄：Rajdhani
- Game Name：Inter

### 4-6 Bottom Promos（3張 Event Banner）
- 從原本2張改為**3張並排**
- 整張卡片可點擊
- 內容主題沿用現有（Daily Bonus、VIP Club、第3張待定）
- 素材設計師提供
- **倒數計時框：只保留線框，不填色（透明背景）**

---

## 五、按鈕規範

### 按鈕類型

| 類型 | Class | 用途 |
|---|---|---|
| Primary | btn-primary | Sign Up、一般CTA |
| Ghost | btn-ghost | Login、翻頁箭頭、次要操作、View More |
| Play | btn-play | 遊戲卡片Play now |

### 互動規範

**btn-primary / btn-ghost（Sign Up / Login）：**
| 狀態 | 效果 |
|---|---|
| 預設 | 金色漸層線框，透明背景 |
| Hover | Border Glow |
| Press | 略為縮小（中心） |

**btn-play（Play now）：**
| 狀態 | 效果 |
|---|---|
| 預設 | 現有樣式保留 |
| Hover | 底座發光（非圓形play鍵發光），不放大 |
| Press | 略為縮小 |

### Padding 規範（統一）

| 按鈕等級 | 上下 | 左右 |
|---|---|---|
| 小（Header） | 8px | 20px |
| 大（Banner CTA） | 14px | 36px |

---

## 六、登入／註冊流程

- 進入網站 → 直接顯示首頁（不強制跳登入頁）

**觸發 Modal 的時機：**

| 觸發點 | 行為 |
|---|---|
| 點擊任何遊戲卡片 | 彈出**登入** Modal |
| 點擊 Login 按鈕 | 彈出**登入** Modal |
| 點擊 Sign Up 按鈕 | 彈出**註冊** Modal |
| 點擊 Banner CTA | 彈出**註冊** Modal |

- Modal出現時背景壓黑（overlay）
- 登入Modal底部：`Are you a new member?` **Sign Up** → 切換到註冊Modal
- 完成後關閉Modal，繼續原本操作

---

## 七、效能策略

**Lazy Loading（懶加載）：**
- 進入首頁只載入螢幕可見範圍內的內容
- 滾動時進入視野的內容才開始載入
- 技術方案：React IntersectionObserver
- Loading動畫遮住載入過程

---

## 八、Logo 素材

已處理的去背版本：
- `logo_transparent.png`：上下排列版（S圖形＋SPINWIN上下）
- `logo_vertical.png`：左右並排版（Header/Sidebar用）← **主要使用**
- `logo_icon.png`：單圖形版（S＋皇冠）

**注意：** AI Vision Model處理時會將透明PNG壓平填上黑底，這是正常現象，使用黑底版確認排版即可，實際網站替換透明版本。

---

## 九、頁面清單

### 現階段完整製作
- [x] 首頁（討論完成，待製作）
- [ ] 遊戲頁面（3種版型，首頁完成後討論）
- [ ] 玩家基本資料頁
- [ ] 商店頁
- [ ] 儲值／提款頁
- [ ] VIP等級頁
- [ ] Daily Bonus頁

### Placeholder（之後補充）
- [ ] 交易記錄／歷史紀錄
- [ ] 安全設定
- [ ] Tournament 錦標賽
- [ ] 優惠活動列表
- [ ] 搜尋結果頁
- [ ] 條款與隱私政策
- [ ] 404 錯誤頁

---

## 十、待討論項目

- [ ] 遊戲頁面3種版型（首頁完成後進行）
- [ ] 各頁面細節
- [ ] 手機版RWD breakpoints
- [ ] Loading動畫設計

---

## 十一、素材待提供清單

- [ ] Jackpot框設計
- [ ] 上方3張Promo Banner人物素材
- [ ] Winners Today頭像照片
- [ ] Bottom Promos 3張Event Banner素材
- [ ] 遊戲卡片Poster圖片
- [ ] 其他人物素材（用於卡片）
