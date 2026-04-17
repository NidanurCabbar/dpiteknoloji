@echo off
chcp 65001 >nul
title DPI Teknoloji - Dev Server
cd /d "%~dp0"

echo.
echo ================================================
echo   DPI TEKNOLOJI - Gelistirme Sunucusu
echo ================================================
echo.

REM node_modules yoksa kur
if not exist "node_modules" (
    echo [!] node_modules bulunamadi, paketler kuruluyor...
    call npm install
    echo.
)

REM Port 5173 kullanimda mi?
netstat -ano | findstr ":5173" | findstr "LISTENING" >nul
if %errorlevel% == 0 (
    echo [!] Port 5173 zaten kullanimda.
    echo     Eski sunucuyu kapatip yenisini baslatmak icin tus basin...
    pause >nul
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
        taskkill /F /PID %%a >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)

echo [+] Sunucu baslatiliyor: http://localhost:5173
echo [+] Durdurmak icin: Ctrl+C
echo.

call npm run dev

echo.
echo Sunucu durdu. Kapatmak icin tus basin...
pause >nul
