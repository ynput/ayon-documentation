---
id: dev_api_cpp
title: AYON C++ API
sidebar_label: C++ API
description: Information about AYON C++ API
toc_max_heading_level: 5
---

## About AYON C++ API

The AYON CPP API allows communication with the AYON server.
Implementation is mainly focused on [AYON USD Resolver](dev_api_usd_resolver.md) to communicate with the server resolve endpoint.

## Get Started

:::tip Development Environment
We assume you already have setup your c++ dev environment as well as cmake.
:::

### Fetch and Build The library
AYON CPP API is a static lib.

You need to build it first. We've prepared python script to do the hard lifting for you.

```shell
git clone --recurse-submodules https://github.com/ynput/ayon-cpp-api.git
cd ayon-cpp-api
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

Please refer to [Fetch and Build The library](#fetch-and-build-the-library) section above for the instructions
and repeat them inside `ext` folder in your project folder.

#### CPP Project Files

```cpp title="main.cpp"
// AYON CPP API Test
#include "AyonCppApi.h"

int main () {
    AyonApi con = AyonApi(
        "path/to/log_file.json",     
        "your_api_key",             // AYON API key
        "http://your.server",       // AYON server url
        "project_name",
        "site-id"                   // e.g. military-mouse-of-jest
    );
    return 0;
}
```

```shell title="CMakeLists.txt"
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

```shell
cmake -S . -B build -DJTRACE=0 
cmake --build build --config Debug -j12
```

#### Test Run

```shell
build\Debug\main.exe
```

#### Expected Output

```shell
my_cpp_project> build\Debug\main.exe
[2025-04-07 13:24:47.985] [info] Failed to determine the OpenSSL directory. Falling back to the default certificate file path.
[2025-04-07 13:24:48.368] [info] Connected to the Ayon server : 200
```

> If you don't see any output in the terminal, the logs may be written only to the `log_file.json` specified in the constructor.

Example contents of `log_file.json`:

```json
{"timestamp":"2025-04-07 13:24:47.985","level":"info","Thread Id":"5832","Process Id":"13732","message":"Failed to determine the OpenSSL directory. Falling back to the default certificate file path."}
{"timestamp":"2025-04-07 13:24:48.368","level":"info","Thread Id":"5832","Process Id":"13732","message":"Connected to the Ayon server : 200"}
```

</details>

## Learn More

For More info and a full list of available commands
Please refer to our [AYON CPP API](https://ynput.github.io/ayon-cpp-api/).