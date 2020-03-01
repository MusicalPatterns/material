#!/usr/bin/env bash

set -e

MATERIAL_DIR="./node_modules/@musical-patterns/material/"

CMD="$1"

tsc -p tsconfig.node.json

if [[ -f ${MATERIAL_DIR}bin/${CMD}.js ]] ; then
	NODE_ENV=material ts-node -P tsconfig.node.json ${MATERIAL_DIR}/bin${CMD}.js
else
	echo "'musical-patterns-material ${CMD}' is not a defined Material command. Or you are using a musical-patterns-material from a foreign PATH and it is not actually installed in your current node_modules. Try running 'which musical-patterns-material' to see what's up."
fi
