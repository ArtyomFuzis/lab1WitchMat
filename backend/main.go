package main

import (
	"net/http"
	"witchmat/Endpoints"
)

func main() {
	http.HandleFunc("/lab1", Endpoints.HandleGetLab1)
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		panic(err)
	}
}
