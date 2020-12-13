@echo off
echo START run script
echo.
echo.
set currentPath=%cd%
call tsc "%currentPath%\app.ts"
echo Translating ts into js finished! I get and to print the execution result!
echo. 
node app
echo.
echo.
echo.
echo END
pause
