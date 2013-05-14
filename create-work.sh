#!/bin/sh

echo
echo Creating new work:
printf "  Slug: " && read SLUG

DIR=`dirname $0`
DDATE=`date +"%Y-%m-%d"`
FILE="$DIR/_posts/$DDATE-$SLUG.md"

echo "Title: $SLUG" > "$FILE"
echo "Date: $DDATE" >> "$FILE"
echo >> "$FILE"
echo >> "$FILE"

# edit
if [ "x$EDITOR" != "x" ]; then
  $EDITOR "$FILE"
fi
