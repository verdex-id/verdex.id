apiurl := localhost:3000/api
userpass := "rizkia" 
useremail := "rizkia.as.actmp@gmail.com"
newemail := "rizkia.as.pac@gmail.com"
userfullname := "rizkia adhy syahputra"
actoken :=  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..xvPUqVXH1mPVqaI_0qN_LQ.0Izjb36S11W9W9NI4JxUSY8wEkHXwioMc5tTkCsxQ4Ae7hbD4UFowMq0EPW4mG8btM3gA5wKuyn18BcGGWJqKuwOQoEdSmHhYHOWqDy13Y--uuXCpjfk_449iqP0Nv1f_2UxdpncXLpinrwNFb3zh5UbIfiq13EepvjNZfwBc8-e6hB2rRrukW5ggNmDdA1s3D2q3IB5igwLCPgG_7uNqw.DLAfsQBYfXvRzs0YeD2b9Q" 
reftoken := "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..Ozb5rgorBUpWDnw4QaAyKA.YMer8edNwOI5xRj4Dy3Dsp6UpHOACTTvhLG0UJ_dvWQwiecAruVx6E6X4UJs1A2aARwAPgJhNq2ZhPAyY8gniNuOAk6ZaH7K8n7Ner5iR3OjlWTw0m-py0ldvOJcYPAmdDqCxvHSfhza9snRO8IjWnZDcjGjQdGHiahcYJ51l1dJwrW1d0ao9tTl8_s8LhHyflRy43CKDI9XphoybRZPlg.StN-ta2GbReVqy8vmPJ_Ow" 



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





admin_register:
	echo -n '{"password":$(userpass), "email" :$(useremail), "full_name" : $(userfullname)}' | http -f POST $(apiurl)/admin/register

admin_login:
	echo -n '{"password":$(userpass) , "email" : $(useremail)}' | http -f POST $(apiurl)/admin/login | jq .data.access_token 

admin_update_fname:
	echo -n '{ "new_name" : "rizkia"}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/admin/settings/name

admin_update_email:
	echo -n '{"password":$(userpass), "new_email" : $(useremail)}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/admin/settings/email

admin_update_password:
	echo -n '{"password":$(userpass), "new_password" :"rizkia"}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/admin/settings/password

admin_up_img:
	curl -X POST -F "file=@tes.jpeg" -H "Authorization: bearer $(actoken)" $(apiurl)/admin/settings/image

admin_toggle_access:
	echo -n '{ "admin_id" : "949ec435-280f-4b43-9d79-eab736b9d1c9"}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/admin/access

get_team:
	http -f GET $(apiurl)/team

mkff:
	alias mkff="make \$( grep -oP '\.PHONY:\s+(.*)' Makefile | tr ' ' '\n' | fzf)"

