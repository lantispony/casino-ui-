# gradient-tool 開發規範

## 版本號
- 每次部屬前更新 `gradient-tool.html` 中的版號（搜尋 `v1.1.x`）
- 格式：`v1.1.x`，依序遞增
- 版號位於中間顯示區右下角

## Tab 停留
- 切換 Card/Text/Icon 時自動儲存至 localStorage `gt_active_tab`
- Init 時讀取並復原頁面

## 語言停留
- 切換語言時自動儲存至 localStorage `gt_lang`
- Init 時讀取並復原
