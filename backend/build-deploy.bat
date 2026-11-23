@echo off
echo Building frontend...
cd /d "%~dp0..\frontend"
call npm run build
if errorlevel 1 exit /b 1

echo Copying frontend to backend/public...
cd /d "%~dp0"
if exist public rmdir /s /q public
mkdir public
xcopy /E /I /Y "..\frontend\dist\*" "public\"

echo Creating deploy zip...
if exist ..\deploy.zip del ..\deploy.zip
REM 'uploads' is intentionally excluded: shipping it overwrites media already uploaded via the admin panel
powershell -Command "Compress-Archive -Path 'package.json','package-lock.json','server.js','src','public' -DestinationPath '..\deploy.zip' -Force"

echo.
echo DONE! Upload deploy.zip to Hostinger Node.js Deployments
echo File: %~dp0..\deploy.zip
pause
