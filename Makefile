apiurl := localhost:3000/api
userpass := "rizkia" 
useremail := "rizkia.as.actmp@gmail.com"
newemail := "rizkia.as.pac@gmail.com"
userfullname := "rizkia adhy syahputra"
actoken :=  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..b8KNtouKa1OunwffzvZfoQ.NSUqMAuvbEcl5eOSST--I33dJx38I61jm9eCyNVv3IuRvFzY3Cr34PELmYK1SegOAHKXr2-lWL2dHvZBIoU5RNcEm6OtgtVUMepNaFeNiTtwFpSM4Qh92S39vXWE7L0ZMPAlu8nEt1etHWWq7f1UZltjnmqvDWU1lSbVM7ovKJVGXP9QEe4rPcgToa3NorY1LjOTBgOcjg6Z1ExVNccunw.cfqc3IaGjSKSNHLvBGUqnQ" 



user_register:
	echo -n '{"password":$(userpass), "email" :$(useremail), "full_name" : $(userfullname)}' | http -f POST $(apiurl)/register

user_login:
	echo -n '{"password":$(userpass) , "email" : $(useremail)}' | http -f POST $(apiurl)/login 

user_update_password:
	echo -n '{"password":$(userpass), "new_password" :"rizkia"}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/user/password

user_update_email:
	echo -n '{"password":$(userpass), "new_email" :$(useremail)}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/user/email

user_update_fname:
	echo -n '{ "new_name" : "rizkia"}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/user/name

admin_register:
	echo -n '{"password":$(userpass), "email" :$(useremail), "full_name" : $(userfullname)}' | http -f POST $(apiurl)/admin/register

admin_toggle_access:
	echo -n '{ "admin_id" : "949ec435-280f-4b43-9d79-eab736b9d1c9"}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/admin/access

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

get_team:
	http -f GET $(apiurl)/team

mkff:
	alias mkff="make \$( grep -oP '\.PHONY:\s+(.*)' Makefile | tr ' ' '\n' | fzf)"

