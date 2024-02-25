apiurl := localhost:3000/api
userpass := "rizkia" 
useremail := "rizkia.as.actmp@gmail.com"
newemail := "rizkia.as.pac@gmail.com"
userfullname := "rizkia adhy syahputra"
actoken := "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..NRsf5JqJEY0LNitUZkMkpw.9s8joFAUbdCfOw7OW7Apsle27y_P3z466w9-xGpBBnClhoD2YD1qioKotRou-O-wfRZ9krxMXs2jWXRr6aEoZ6TFOgKkQqrkL6aN6cXUaYCqbJeJfuvOaJZ40vn8-gFqJ0hmFpLeNy9heM9voA9iCm-bRQIBdBul5ZyNsP64sX4OQ1UcvFAM9-mSKKTbUPrMsCVXb0-wjCM4xsInRrp-Iw.LJsVXdjhhrbqUpRqM76FQQ" 



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

admin_update_fname:
	echo -n '{ "new_name" : "rizkia"}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/admin/settings/name

admin_update_email:
	echo -n '{"password":$(userpass), "new_email" : $(useremail)}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/admin/settings/email

admin_update_password:
	echo -n '{"password":$(userpass), "new_password" :"rizkia"}' | http -A bearer -a $(actoken) -f PUT $(apiurl)/admin/settings/password

get_team:
	http -f GET $(apiurl)/team

mkff:
	alias mkff="make \$( grep -oP '\.PHONY:\s+(.*)' Makefile | tr ' ' '\n' | fzf)"

