---
id: dev_api_cpp
title: AYON C++ API
sidebar_label: C++ API
description: Information about AYON C++ API
toc_max_heading_level: 5
---

What is the C++ Language standard? it's ISO C++17 Standard

## About AYON C++ API

The AYON CPP API allows communication with the AYON server.
Its focus is on communication with the server Resolve endpoint.
and it's meant to be used mainly by [AYON USD Resolver](dev_api_usd_resolver.md).

## Get Started

:::tip Development Environment
We assume you already had your c++ dev environment setup as well as cmake.
:::

### Fetch and Build The library
AYON CPP API is a static lib so you'd need to build it first.

You can use the provided python script to do the hard lifting for you.

```shell
git clone https://github.com/ynput/ayon-cpp-api.git
cd ayon-cpp-api
git submodule update --init --recursive
python AyonBuild.py setup 
python AyonBuild.py runStageGRP CleanBuild
```

### Include it in your cmake projects

Once you include it and build your cpp project you'll no longer need the library.

<details><summary>A CPP Example</summary>

Here's an example cpp project structure
```
.
├─ ext/ayon-cpp-api
├─ CMakelists.txt
└─ main.cpp
```

#### Fetch Dependencies

Please refer to [Fetch and Build The library](dev_api_cpp#fetch-and-build-the-library) section above for the instructions
and repeat them inside `ext` folder in your project folder.

#### CPP Project Files

```cpp title="main.cpp"
// AYON CPP API Test
#include "AyonCppApi.h"

int main (){
    AyonApi con = AyonApi();
    return 0;
}
```

```shell title="CMakelists.txt"
cmake_minimum_required(VERSION "3.28.1")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

project(main)

# Include AyonCppApi 
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/ext/ayon-cpp-api")
include_directories("${CMAKE_CURRENT_SOURCE_DIR}/ext/ayon-cpp-api")

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(${PROJECT_NAME} AyonCppApi)
```

#### Build the project

> I'm using `VS studio` (devenv.exe) on my side.

```shell
cmake -S . -B build -DJTRACE=0 
devenv build/main.sln /Build 
```

#### Test Run

you'd need to set few environment variables.
otherwise, it won't work.

```shell
set AYON_SERVER_URL=<your ayon server url>
set AYON_API_KEY=<your server api key>
set AYON_PROJECT_NAME=<project name>
set AYON_SITE_ID=<site id>  # e.g. military-mouse-of-jest

build\Debug\main.exe
```

Expected Output
```shell
my_cpp_project> build\Debug\main.exe
[2024-09-20 15:59:31.541] [info] Loaded AYON_API_KEY and AYON_SERVER_URL
[2024-09-20 15:59:31.542] [info] Found SideId
```

:::tip `AYON_SITE_ID` fallback
When skipping setting `AYON_SITE_ID` env variable, the lib will default to file named `site_id` *without an extension*.
located at `%AppData%/Roaming/AYON/site_id` on windows.
:::

</details>

## Learn More

For More info and a full list of available commands
Please refer to our [AYON CPP API](https://ynput.github.io/ayon-cpp-api/).