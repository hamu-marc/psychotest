ls -1 | gawk 'BEGIN { print "[" } { print "{\"title\":\""$0"\",\"id\":\""$0"\"}," } END { print "{}]" }' > index.json
