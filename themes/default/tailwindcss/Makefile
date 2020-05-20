all: minify

build:
	@NODE_ENV=production npx tailwindcss build styles.css -c tailwind.config.js -o ../public/css/tailwindcss.css

minify: build
	@npx csso ../public/css/tailwindcss.css -o ../public/css/tailwindcss.min.css
	@ls -lh ../public/css/tailwindcss*.css

watch: all
	@inotify-hookable -f tailwind.config.js -f styles.css -w ../templates -c "make" 2>/dev/null

first-install:
	yarn add csso-cli tailwindcss
	npx tailwindcss init --full

install:
	yarn install --production --pure-lockfile
