---
id: dev_api_cpp
title: AYON C++ API
sidebar_label: C++ API
description: Information about AYON C++ API
toc_max_heading_level: 5
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## About AYON C++ API

The AYON CPP API is a static lib. It allows communication with the AYON server.
Implementation is mainly focused on [AYON USD Resolver](dev_api_usd_resolver.md) to communicate with the server resolve endpoint.

:::tip Development Environment
We assume you already have setup your C++ dev environment as well as cmake.
You need to use at least C++17 in CMake
:::


## C++ Example Project

Once built, you can then start including it in your cpp projects.

<Tabs>
  <TabItem value="Project Structure" label="Project Structure" default>

```
.
├─ ext/ayon-cpp-api
├─ CMakelists.txt
└─ main.cpp
```
  </TabItem>
  <TabItem value="main.cpp" label="main.cpp" default>

```cpp
// AYON CPP API Test
#include <iostream>
#include "AyonCppApi.h"

int main (){
    std::string project_name = "" ;
    std::cout << "Enter a project: ";
    std::cin >> project_name;

    AyonApi con = AyonApi(
        "log/log.json",           // extension will be always changed to json
        "your_access_token",      // This is a Bearer access token not AYON_API_KEY
        "https://your.server",    // with No trailing or forward slash at the end.
        project_name,
        "your-site-id"            // Your site id e.g. military-mouse-of-jest
    );
    
    std::string uri = "" ;
    std::cout << "Enter a uri to resolve: ";
    std::cin >> uri;

    std::pair<std::string, std::string> resolvedAsset = con.resolvePath(uri);
    std::cout << "The resolved path: " << resolvedAsset.second << std::endl;
    return 0;
}
```
:::caution

The auth key used in the cpp example is an [Authentication Token](https://community.ynput.io/t/ayon-rest-api-guide/1268#get-authentication-token-6) which is not an `AYON_API_KEY`.
Also, don't add a trailing forward slash to your AYON server URL.
:::

  </TabItem>
  <TabItem value="CMakeLists.txt" label="CMakeLists.txt">

```shell
cmake_minimum_required(VERSION "3.28.1")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

project(main)

# Include AyonCppApi 
add_subdirectory("${CMAKE_CURRENT_SOURCE_DIR}/ext/ayon-cpp-api")
include_directories("${CMAKE_CURRENT_SOURCE_DIR}/ext/ayon-cpp-api")
include_directories("${CMAKE_CURRENT_SOURCE_DIR}/ext/ayon-cpp-api/ext/ayon-cpp-dev-tools/src/")

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(${PROJECT_NAME} AyonCppApi)
```
  </TabItem>
</Tabs>

*This example is brought from: [test_cpp_api](https://github.com/MustafaJafar/ayon-recipes/tree/main/test_cpp_api).*


### Build And Run Commands

- **Build CPP**
    `ayon-cpp-api` repo provides python script to do the hard lifting for you.
    ```
    git submodule update --init --recursive
    cd ext\ayon-cpp-api
    python AyonBuild.py --setup
    python AyonBuild.py --runStageGRP CleanBuild
    ```
- **Build CPP Example**
    ```
    rmdir /s /q build
    cmake -S . -B build -DJTRACE=0 
    cmake --build ./build --config Debug -j12
    ```
- **Run CPP Example**
    ```
    build\Debug\main.exe
    ```
- **Example Output**
    ```
    Enter a project: Animal_Logic_ALab
    Enter a uri to resolve: ayon+entity://Animal_Logic_ALab/assets/book_encyclopedia01?product=usdAsset&version=v002&representation=usd
    The resolved path: H:\AYON\projects\Animal_Logic_ALab\assets\book_encyclopedia01\publish\usd\usdAsset\v002\ALA_book_encyclopedia01_usdAsset_v002.usd
    ```
- **Example contents of `log.json`**
    ```json
    {"timestamp":"2025-04-07 13:24:48.368","level":"info","Thread Id":"5832","Process Id":"13732","message":"Connected to the Ayon server : 200"}
    {"timestamp":"2025-07-18 18:14:56.645","level":"warning","Thread Id":"34840","Process Id":"40096","message":"asset identification cant be generated {"entities":[],"error":"Invalid scheme: h","uri":"H:\\AYON\\projects\\Animal_Logic_ALab\\assets\\book_encyclopedia01\\publish\\usd\\usdAsset\\v002\\ALA_book_encyclopedia01_usdAsset_v002.usd"}"}
    {"timestamp":"2025-07-18 18:16:17.522","level":"warning","Thread Id":"564","Process Id":"37400","message":"asset identification cant be generated {"entities":[{}],"uri":"ayon+entity://Animal_Logic_ALab/assets/book_encyclopedia01?product=usdAsset"}"}
    {"timestamp":"2025-07-18 18:16:48.017","level":"warning","Thread Id":"33948","Process Id":"38436","message":"asset identification cant be generated {"entities":[],"error":"Invalid scheme: ","uri":"{root[work]}/Animal_Logic_ALab/assets/book_encyclopedia01/work/lookdev/ALA_book_encyclopedia01_lookdev_v001.hip"}"}
    ```

## Learn More

For More info and a full list of available commands
Please refer to our [AYON CPP API](https://ynput.github.io/ayon-cpp-api/).