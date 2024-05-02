#!/bin/bash

# The source directory containing JPG files
SRC_DIR="./png"

# The target directory for WEBP files
TARGET_DIR="./webp"

# Create the target directory structure and convert files
find "$SRC_DIR" -type d | while read -r dir; do
	# Create corresponding directory in target location
	newdir="${dir/$SRC_DIR/$TARGET_DIR}"
	echo "Creating directory: $newdir"
	mkdir -p "$newdir"
done

find "$SRC_DIR" -type f \( -iname "*.jpg" -o -iname "*.png" \) | while read -r filename; do
	# Calculate new file path
	newpath="${filename/$SRC_DIR/$TARGET_DIR}"
	newpath="${newpath%.png}.webp"

	# Check if the WEBP file already exists
	if [ ! -f "$newpath" ]; then
		echo "Converting $filename to $newpath"
		convert "$filename" "$newpath"
	else
		echo "Conversion skipped for $filename as $newpath already exists."
	fi
done

# cp -r ./webp ~/Documents/Images
# mv ~/Documents/Images/webp ~/Documents/Images/official-website
