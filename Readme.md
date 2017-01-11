# MINERVA HUB

## Instructions for the server installation

Main instructions for elaborating a reactive server using Express, Node, MongoDB and Typescript. 

1. Install Typescript: npm install -g typescript
2. Install mongoDB on the computer. 
3. Init node.js: npm init
4. Install initial dependencies: 
    - mongoose: npm install mongoose --save
    - express: npm install express --save
    - Body parser: npm install body-parser --save
5. Install typescript definitions: 
    typings install mongoose
    typings install dt~express --save
    typings install dt~body-parser --save 
    typings install dt~node --save --global
    typings install mime --save
    typings install dt~express-serve-static-core --save --global
    typings install dt~serve-static --save 
6. Add tsconfig.json
````
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  }
}
````