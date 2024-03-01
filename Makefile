apiurl := localhost:3000/api
userpass := "rizkia" 
useremail := "rizkia.as.actmp@gmail.com"
newemail := "rizkia.as.pac@gmail.com"
userfullname := "rizkia adhy syahputra"
actoken :=  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..aLDmgyJuRGRnc1OoWXIqMg.4eUDFcaRCxJc3pBDOA9tfOuCJluz76Fk2ojqJM4tfa3w3H_c_ZJ5lpCIZNT5wQohs3rwLbrpg3ceLCQkUxGyXsZpu0bDjQU2WL2tj7mP5o2__Hgl79cOWkXaUzFlBbCXzNPiRbe2m7_LpGRM7WHZiMnBVRSHBOwPDVMa48xUBP2QouAP5LkXwHxcx60K1N7MmBsBH37pJV4_BMQSaE6OEQ.bQBMK-S2xhQyPiAKQZYw9Q" 
reftoken := "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..QzsrcUXQLVVhU5GT1YuQPw.DLKle3UDDUJNQaVZXoYQcQFJwxNVoTxiX5uFcbCKML8B7ro0fUOIJm-T-Gu2PdHcNkqi01DZ1JdKi7AvTtiWa1StWEIG2besmwrteGCSMYrHIi0gWJQa4CO38qPJCWYLQXq95ShBiWRP8HZqE-O7tOVMFGI4czW0DKbGPUtaVzgLQptUN_6pwuMKqprr2SECWU-ht5PAB3_lUIU6d8UFig.9tIDrGoVRIBmEXNIA0hubw" 

adminId := "c1b500a3-644c-417a-93b8-1c8692045cd0" 


user_register:
	curl -X POST -H "Content-Type: application/json" -d '{"password":$(userpass), "email":$(useremail), "full_name":$(userfullname)}' $(apiurl)/user/register | jq

user_login:
	curl -X POST -H "Content-Type: application/json" -d '{"password":$(userpass), "email":$(useremail)}' $(apiurl)/user/login | jq

user_update_fname:
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"new_name":"rizkia"}' $(apiurl)/user/settings/name | jq

user_update_password:
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"password":$(userpass), "new_password":"rizkia"}' $(apiurl)/user/settings/password | jq

user_update_email:
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"password":$(userpass), "new_email":$(useremail)}' $(apiurl)/user/settings/email | jq

user_refresh:
	curl -X POST -H "Content-Type: application/json" -d '{"refresh_token":$(reftoken)}' $(apiurl)/user/token | jq




admin_refresh:
	curl -X POST -H "Content-Type: application/json" -d '{"refresh_token":$(reftoken)}' $(apiurl)/admin/token | jq

admin_register:
	curl -X POST -H "Content-Type: application/json" -d '{"password":$(userpass), "email":$(useremail), "full_name":$(userfullname)}' $(apiurl)/admin/register | jq

admin_login:
	curl -X POST -H "Content-Type: application/json" -d '{"password":$(userpass), "email":$(useremail)}' $(apiurl)/admin/login | jq

admin_update_fname:
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"new_name":"rizkia adhy syahputra"}' $(apiurl)/admin/settings/name | jq

admin_update_email:
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"password":$(userpass), "new_email":$(useremail)}' $(apiurl)/admin/settings/email | jq

admin_update_password:
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"password":$(userpass), "new_password":"rizkia"}' $(apiurl)/admin/settings/password | jq

admin_up_img:
	curl -X POST -F "file=@tes.jpeg" -H "Authorization: bearer $(actoken)" $(apiurl)/admin/settings/image

admin_toggle_access:
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"admin_id": $(adminId) }' $(apiurl)/admin/access | jq

get_team:
	curl -X GET $(apiurl)/team | jq


