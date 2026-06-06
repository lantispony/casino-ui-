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

## Ctrl+Z 復原
- `gradHistory` 陣列儲存最多 50 步漸層狀態
- `pushUndo()` 在以下操作前呼叫：
  - 刪除色標（拖曳刪除）
  - 移動色標（拖曳結束）
  - 新增色標（點擊箭頭區域）
  - 套用保存樣式
  - 編輯顏色/位置/透明度/角度等輸入欄位（focus 時 push 一次）
- `undo()` 還原上一步，綁定 Ctrl+Z

## 調色盤 Swatches 面板 (`v1.1.7`)
- 32 組預設色票（黑/白/灰階/三原色/二次色/品牌金等）
- 儲存於 localStorage `gt_cp_swatches`
- 左鍵點擊套色、右鍵選單（Edit/Replace/Delete）
- 拖曳色票至框外即時刪除（無 × 按鈕）,「+ Add」按鈕新增目前顏色
- 調色盤彈窗位置記憶（localStorage `gt_cp_box_pos`），拖曳/關閉時儲存，開啟時復原
