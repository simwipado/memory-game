# Memory Game

## Development
clone the repository 
```
git clone https://github.com/simwipado/memory-game
cd memory-game
```
install packages
```
npm i
```
run development sever on port 3000, hot reloading from src/ directory
```
npm start
```

## Serve statically with production build
clone the repository 
```
git clone https://github.com/simwipado/memory-game
cd memory-game
```
install production packages
```
npm i --only=prod
```
create production build on build/ directory
```
npm run build
```
serve built package on static server
```
npm i -g serve
serve -s build
```