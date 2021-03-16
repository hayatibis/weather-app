#!/bin/bash
curl -v 'http://localhost:8080/api/current/forecast/fetch/ankara'
curl -v 'http://localhost:8080/api/current/forecast/fetch/istanbul'
curl -v 'http://localhost:8080/api/current/forecast/fetch/izmir'

curl -v 'http://localhost:8080/api/daily/forecast/fetch/39.9199,32.8543'
curl -v 'http://localhost:8080/api/daily/forecast/fetch/41.0351,28.9833'
curl -v 'http://localhost:8080/api/daily/forecast/fetch/38.4622,27.0923'