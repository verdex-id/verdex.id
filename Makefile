apiurl := localhost:3000/api
userpass := "rizkia" 
useremail := "rizkia.as.actmp@gmail.com"
userfullname := "rizkia adhy syahputra"
actoken := "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..KErrnD_-LwySXZuKWQ6Bjg.0mDKEZBlu8jz-nPAWUH5R3bnIwk-e_ljGLsWNquyA0H-aNzpRUc3K1-HBXVDYYA3ges4fs3KSLuU3AgWwgJtd-q09T26hJJBrNekBLrOcfoWTikkv6800GV5CO-DgmskLm9jp2CAE1k0Ln5nnZgJgHVAdNby4lMPBJ00iGamsxX9vpXaRliVcvqRzxpffGHGboIPfoaRU2M4jWVeREWfwQ.cbDQ2Gtbpf3BVYtgD5u8Vw"



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
	echo -n '{"password":$(userpass) , "email" : $(useremail)}' | http -f POST $(apiurl)/admin/login

mkff:
	alias mkff="make \$( grep -oP '\.PHONY:\s+(.*)' Makefile | tr ' ' '\n' | fzf)"

