# Basic Steps for Building an Express API with TypeORM

## 🛠️ Install modules

### Init project
```sh
npm init -y
```

### Express
```sh
npm i express
```

### TypeScript
```sh
npm i -D typescript
```

### Node types and Express types
```sh
npm i -D @types/node
npm i -D @types/express
```

### Additional modules
```sh

npm i cors
npm i -D @types/cors

npm i -D nodemon
npm i -D ts-node

npm i bcrypt
npm i -D @types/bcrypt

npm i @faker-js/faker

npm i jsonwebtoken
npm i -D @types/jsonwebtoken

npm i dotenv
```

### TypeORM
```sh
npm i typeorm reflect-metadata mysql2
```

### Optional modules
```sh
npm i http-status-codes
npm i colors
```


## ⚙️ Configurations

### Create `tsconfig.json`
```sh
npx tsc --init
```

### Configure `tsconfig.json`
```json
{
    "compilerOptions": {
        "target": "ES2021",
        "experimentalDecorators": true, 
        "emitDecoratorMetadata": true,
        "rootDir": "./src",
        "outDir": "./dist",
    },
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules"
    ]
}
```

### Initial project structure
```sh
├── ./src
│   ├── config
│   │   ├── app.ts
│   │   ├── cors.ts
│   ├── constants
│   ├── controllers
│   ├── database
│   │   ├── factories
│   │   ├── migrations
│   │   ├── seeders
│   │   └── data-source.ts
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   ├── types
│   ├── app.ts
│   └── server.ts
├── ./env
├── ./env-sample
├── ./gitignore
├── ./package.json
├── ./README.md
└── ./tsconfig.json
```

### Configure `package.json`
```json
{
    "main": "dist/server.js",
    "scripts": {
        "build": "tsc",
        "start": "node dist/server.js",
        "dev": "nodemon --files src/server.ts"
    },
}
```

## 📜 Main TypeORM CLI scripts

### Create migrations manually (example)
```sh
npx typeorm migration:create ./src/database/migrations/CreateUsersTable
```

### Execute migrations
```sh
npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts 
```

### Revert migrations
```sh
npx typeorm-ts-node-commonjs migration:revert -d ./src/database/data-source.ts 
```

### Create models (example)
```sh
npx typeorm entity:create ./src/models/User
```

### Drop database
```sh
npx typeorm-ts-node-commonjs schema:drop -d ./src/database/data-source.ts
```

