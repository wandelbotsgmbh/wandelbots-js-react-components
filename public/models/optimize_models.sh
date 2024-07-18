#!/bin/bash

for f in *.glb; do
    gltf-transform draco "$f" "$f"  
done