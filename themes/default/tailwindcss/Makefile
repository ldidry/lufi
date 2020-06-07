all: minify

cat-css:
	@echo -n 'Concatenating css files to styles.css…'
	@cat styles/*.css > styles.css
	@echo ' Done.'

build: cat-css
	@echo 'TailwindCSS processing…'
	@NODE_ENV=production npx tailwindcss build styles.css -c tailwind.config.js -o ../public/css/lufi.css
	@echo ' Done.'

minify: build
	@echo -n 'Minifying lufi.css file…'
	@npx csso ../public/css/lufi.css -o ../public/css/lufi.min.css
	@echo ' Done.'
	@ls -lh ../public/css/lufi*.css

watch: all
	@inotify-hookable -f tailwind.config.js -w styles -w ../templates -c "make" 2>/dev/null

first-install:
	yarn add csso-cli tailwindcss
	npx tailwindcss init

install:
	yarn install --production --pure-lockfile
