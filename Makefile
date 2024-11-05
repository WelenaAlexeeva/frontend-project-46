install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
lintfix:
	npx eslint --fix .
video:
	asciinema rec demo.cast --overwrite
videoup:
	asciinema upload demo.cast
gendiff:
	node bin/gendiff.js

.PHONY: test
