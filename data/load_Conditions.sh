#!/bin/bash
API_URL="https://cod19-health-dev.herokuapp.com/conditions"

#http POST $API_URL name="Pregnancy"
#http POST $API_URL name="Obesity"
#http POST $API_URL name="Cancer"
#http POST $API_URL name="Diabetes"
#http POST $API_URL name="HIV/other immune deficiency"
#http POST $API_URL name="Heart disease"
#http POST $API_URL name="Asthma (requiring medication)"
#http POST $API_URL name="Chronic lung disease (non-asthma)"
#http POST $API_URL name="Chronic liver disease"
#http POST $API_URL name="Chronic haematological disorder"
#http POST $API_URL name="Chronic kidney disease"
#http POST $API_URL name="Chronic neurological impairment/disease"
#http POST $API_URL name="Organ or bone marrow recipient"
#http POST $API_URL name="Other pre-existing condition(s)"

#dev
http PUT "${API_URL}/5e77aea7de262a50730b4230" name="Fever" translation:='{"en": "Fever", "fr": "Fièvre"}'
http PUT "${API_URL}/5e78a8b573574d002b658050" name="Pregnancy" translation:='{"en": "Pregnancy", "fr": "Grossesse"}'
http PUT "${API_URL}/5e78a8b673574d002b658051" name="Obesity" translation:='{"en": "Obesity", "fr": "Obésité"}'
http PUT "${API_URL}/5e78a8b673574d002b658052" name="Cancer" translation:='{"en": "Cancer", "fr": "Cancer"}'
http PUT "${API_URL}/5e78a8b773574d002b658053" name="Diabetes" translation:='{"en": "Diabetes", "fr": "Diabètes"}'
http PUT "${API_URL}/5e78a8b773574d002b658054" name="HIV/other immune deficiency" translation:='{"en": "HIV/other immune deficiency", "fr": "VIH/autre déficience du système immunitaire"}'
http PUT "${API_URL}/5e78a8b873574d002b658055" name="Heart disease" translation:='{"en": "Heart disease", "fr": "Maladie cardiaque"}'
http PUT "${API_URL}/5e78a8b973574d002b658056" name="Asthma (requiring medication)" translation:='{"en": "Asthma (requiring medication)", "fr": "Asthme (nécessitant traitement)"}'
http PUT "${API_URL}/5e78a8b973574d002b658057" name="Chronic lung disease (non-asthma)" translation:='{"en": "Chronic lung disease (non-asthma)", "fr": "Maladie pulmonaire chronique (non asthme)"}'
http PUT "${API_URL}/5e78a8ba73574d002b658058" name="Chronic liver disease" translation:='{"en": "Chronic liver disease", "fr": "Maladie chronique du foie"}'
http PUT "${API_URL}/5e78a8ba73574d002b658059" name="Chronic haematological disorder" translation:='{"en": "Chronic haematological disorder", "fr": "Trouble chronique hématologique"}'
http PUT "${API_URL}/5e78a8bb73574d002b65805a" name="Chronic kidney disease" translation:='{"en": "Chronic kidney disease", "fr": "Maladie rénale chronique"}'
http PUT "${API_URL}/5e78a8bc73574d002b65805b" name="Chronic neurological impairment/disease" translation:='{"en": "Chronic neurological impairment/disease", "fr": "Trouble/maladie neurologique chronique"}'
http PUT "${API_URL}/5e78a8bc73574d002b65805c" name="Organ or bone marrow recipient" translation:='{"en": "Organ or bone marrow recipient", "fr": "Receveur une greffe d organes ou de moelle osseuse"}'
http PUT "${API_URL}/5e78a8bd73574d002b65805d" name="Other pre-existing condition(s)" translation:='{"en": "Other pre-existing condition(s)", "fr": "Autre condition médicale"}'