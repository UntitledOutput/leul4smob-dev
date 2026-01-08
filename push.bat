@echo off
setlocal enabledelayedexpansion

:: Set your source and destination directories
set "SOURCE=D:/Code/leul4smob-dev/"
set "DEST=D:/Code/potential-telegram/"
set "EXCLUDE_FILES=_config.yml _config_dev.yml push.bat run.bat"
set "EXCLUDE_FOLDERS=_site .git .jekyll-cache screenshots res"

:: Create destination directory if it doesn't exist
if not exist "%DEST%" mkdir "%DEST%"

echo Copying from: %SOURCE%
echo Copying to: %DEST%
echo.

:: Copy individual files (non-recursive)
echo Copying files...
for %%F in ("%SOURCE%\*") do (
    set "skip=0"
    set "filename=%%~nxF"
    
    :: Check if file should be excluded
    for %%E in (%EXCLUDE_FILES%) do (
        if /i "!filename!"=="%%E" set "skip=1"
    )
    
    :: Copy if not excluded
    if !skip!==0 (
        echo Copying file: !filename!
        copy "%%F" "%DEST%\" >nul
    ) else (
        echo Skipping file: !filename!
    )
)

echo.
echo Copying folders...

:: Copy folders (non-recursive, just top-level folders)
for /d %%D in ("%SOURCE%\*") do (
    set "skip=0"
    set "foldername=%%~nxD"
    
    :: Check if folder should be excluded
    for %%E in (%EXCLUDE_FOLDERS%) do (
        if /i "!foldername!"=="%%E" set "skip=1"
    )
    
    :: Copy folder and contents if not excluded
    if !skip!==0 (
        echo Copying folder: !foldername!
        xcopy "%%D" "%DEST%\!foldername!\" /E /I /H /Y >nul
    ) else (
        echo Skipping folder: !foldername!
    )
)

echo.
echo Copy complete!
pause