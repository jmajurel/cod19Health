#!/bin/bash
API_URL="https://cod19-health-dev.herokuapp.com/symptoms"

http POST $API_URL name="Fever"
http POST $API_URL name="Sore throat"
http POST $API_URL name="Runny nose"
http POST $API_URL name="Cough"
http POST $API_URL name="Shortness of breath"
http POST $API_URL name="Vomiting"
http POST $API_URL name="Nausea"
http POST $API_URL name="Diarrhoea"


