.PHONY: install run lint test build dockerimage clean

.git/hooks/pre-commit:
	echo "npm run lint" > .git/hooks/pre-commit
	chmod +x .git/hooks/pre-commit

node_modules/.installed: package.json .git/hooks/pre-commit
	npm install
	touch node_modules/.installed

install: node_modules/.installed

run: install
	npm run dev

lint: install
	npm run fix && npm run lint

test: install
	npm run test

build: install
	npm run build

dockerimage: install
	docker build . -t useless-interface

clean:
	rm -rf node_modules build
