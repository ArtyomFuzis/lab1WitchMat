package main

import (
	"log"
	"net/http"
	"witchmat/Endpoints"
)

func main() {
	log.Println("Started!!!")
	http.HandleFunc("/lab1", Endpoints.HandleGetLab1)
	err := http.ListenAndServe(":8081", nil)
	if err != nil {
		panic(err)
	}
}
