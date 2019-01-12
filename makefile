# Paths
build := typescript/tsconfig.build.json
dev := typescript/tsconfig.dev.json

# NPX functions
tsc := node_modules/.bin/tsc

main: dev

.IGNORE: clean

dev:
	@echo "[INFO] Building for development"
	@NODE_ENV=development $(tsc) --p $(dev)

build:
	@echo "[INFO] Building for production"
	@NODE_ENV=production $(tsc) --p $(build)

install:
	@echo "[INFO] Installing dev Dependencies"
	@yarn install --production=false

install-prod:
	@echo "[INFO] Installing Dependencies"
	@yarn install --production=true

clean:
	@echo "[INFO] Cleaning dist files"
	@rm -rf dist

publish: install clean build
	@echo "[INFO] Publishing package"
	@npm publish --access=public
