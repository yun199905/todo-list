# NestJS 待辦事項與使用者管理後端專案

![NestJS](https://img.shields.io/badge/NestJS-v10.0.0-E0234E?style=flat&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.1.3-3178C6?style=flat&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v20.x-339933?style=flat&logo=node.js&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-v9.15.0-F69220?style=flat&logo=pnpm&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-v11.0.0-000000?style=flat&logo=json-web-tokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-v11.0.6-85EA2D?style=flat&logo=swagger&logoColor=black)
![Casbin](https://img.shields.io/badge/Casbin-v5.38.0-4B32C3?style=flat)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 簡介

本專案是基於 NestJS 框架開發的後端 API，使用 MongoDB Atlas 作為資料庫，提供使用者註冊、登入、CRUD 操作，並包含 RBAC 權限管理。

本練習專案參考：
[2021 iThome 鐵人賽 NestJS 帶你飛！](https://ithelp.ithome.com.tw/users/20119338/ironman/3880) 系列
作者：HAO

## 技術棧

- **後端框架**: NestJS
- **資料庫**: MongoDB Atlas
- **驗證與授權**: JWT、RBAC
- **開發工具**: TypeScript、pnpm

## 環境變數設定

請在專案根目錄下建立 `.env` 檔案，並填入以下內容：

```
MONGO_USERNAME=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
MONGO_RESOURCE=your_mongodb_cluster_url

JWT_SECRET=your_jwt_secret
```

## 安裝與啟動

### 1. 安裝相依套件

```sh
pnpm install
```

### 2. 啟動專案

```sh
pnpm start:dev
```

## 專案結構概覽

```
.
├── README.md
├── package.json
├── pnpm-lock.yaml
├── nest-cli.json
├── rbac
│   ├── model.conf
│   └── policy.csv
├── src
│   ├── app.module.ts
│   ├── common  # 共用資源 (常數、列舉、模型等)
│   ├── configs # 設定檔 (MongoDB、JWT 等)
│   ├── core    # 核心功能 (守衛、攔截器、RBAC 授權等)
│   ├── features # 功能模組 (使用者、待辦事項、身份驗證等)
│   ├── main.ts # 入口文件
└── tsconfig.json
```

## API 端點

本專案使用 **Swagger UI** 自動生成 API 文件，啟動專案後，可透過以下網址存取 API 文件：

```
http://localhost:3000/api
```

## RBAC 權限管理

本專案使用基於角色的存取控制（RBAC），並透過 **Casbin** 進行權限驗證。

### 權限設定

- **請求定義**: 主體 (sub)、資源 (obj)、動作 (act)
- **政策定義**: 角色 (sub) 可對資源 (obj) 執行特定動作 (act)
- **角色繼承**: 角色之間的繼承關係
- **匹配規則**: 透過 `keyMatch2` 進行資源匹配，允許對應動作存取

### 角色與權限

- **管理員 (Admin)**: 擁有所有 API 端點的存取權限
- **管理者 (Manager)**: 可建立與刪除 `todos`
- **成員 (Member)**: 可讀取、修改單筆 `todos`，並能查詢 `users` 資訊

## License

MIT
