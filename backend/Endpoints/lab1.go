package Endpoints

import (
	"encoding/json"
	"log"
	"net/http"
	"witchmat/Services"
	"witchmat/Transfer"
)

func HandleGetLab1(w http.ResponseWriter, req *http.Request) {
	if req.Method != "POST" {
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}
	headerContentType := req.Header.Get("Content-Type")
	if headerContentType != "application/json" {
		log.Println("Content Type is not application/json")
		w.WriteHeader(http.StatusUnsupportedMediaType)
		return
	}
	var bodyEncoded []byte
	_, err := req.Body.Read(bodyEncoded)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Unable to read request body: " + err.Error())
		return
	}
	var body Transfer.Lab1GetDTO
	decoder := json.NewDecoder(req.Body)
	decoder.DisallowUnknownFields()
	err = decoder.Decode(&body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Json cannot be parsed: " + err.Error())
		return
	}
	res := Services.SolveLab1(body)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	err = json.NewEncoder(w).Encode(res)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		log.Println("Object cannot be encoded to json")
		return
	}
}
