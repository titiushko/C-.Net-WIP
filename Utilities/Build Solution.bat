@echo off

:init
set /p option=(1) Debug (2) Release: 

if not defined option goto init
if %option%==1 goto option1
if %option%==2 goto option2
goto init

:option1
set config=Debug
goto compile

:option2
set config=Release
goto compile

:compile
set msbuild_path="C:\Program Files (x86)\MSBuild\14.0\Bin"
set solution_path="C:\Users\javier.galdamez\Documents\Git Repositories\C-.Net-WIP\Titiushko"

::https://docs.microsoft.com/es-es/visualstudio/msbuild/msbuild?view=vs-2017
%msbuild_path%\MSBuild.exe %solution_path%\Titiushko.sln /property:Configuration=%config%

pause
