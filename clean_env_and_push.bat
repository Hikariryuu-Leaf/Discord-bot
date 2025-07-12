
@echo off
echo ========================================
echo 🔥 Đang xóa file .env khỏi lịch sử Git...
echo ========================================

git rm --cached .env
echo .env>>.gitignore
git add .gitignore
git commit -m "Remove .env and update .gitignore"

git filter-branch --force --index-filter "git rm --cached --ignore-unmatch .env" --prune-empty --tag-name-filter cat -- --all

echo ========================================
echo ✅ Đã làm sạch lịch sử. Bắt đầu push...
echo ========================================

git push origin --force

echo ========================================
echo ✅ Push hoàn tất. Đừng quên truy cập link unblock của GitHub nếu được yêu cầu.
pause
