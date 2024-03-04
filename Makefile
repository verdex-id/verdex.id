apiurl := localhost:3000/api
ac_pass:= rizkia
ac_email := rizkia.as.actmp@gmail.com
new_name := rizkia adhy syahputra
new_email := rizkia.as.pac@gmail.com
new_password := rizkia
ac_fn := "rizkia adhy syahputra"

actoken :=  "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..Jp9ICYhrvr8UcvZMDK8uVw.lcjslRWGNvX3_PP-aZKe9bj2mmBWNClYT2FqLYrilrn64rpLyR5D6GMC3fz24SUIcYIS3T5wuZnFtBwmji_aqfIRx5fC5167srYfXm95rGByNbV-0sV9d99qVDxCDD46_6lapM5qxshwcV2UacpzsDiD3iMrkiaX6ZGe8o_yIUR8uTs_FSBL1n7kZjlcQg3K_nhCsMMOVcb2y73g00v3iw.guilTXh8ChuTWJwd63D9rg" 
reftoken := "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..x5psf6I7bVvVG17hEp5E4w.Ws5WghgAfd1IdXS4aRjfqomZhyqaKH-h9gZxx7YLi7dUig7oQ4QSrwv4PDSAEFw2QgqAl1C1mptqM2KFFcDxQDUX8hS6RxuEJz6VWShZJWeFxRmTgP3iVSCyuqNhvKyO0cyjvCMnDjGIw5Y6aqCHAhpQgaaiuTVdxw1WqXavAikILXov64Tazg580mIOOPH7MnImu31_8KqTGrQacmUuaw.ynT0NpF1qKVxcjWHl7kSaw" 



user_register: #
	curl -X POST -H "Content-Type: application/json" -d '{"password":$(ac_pass), "email":$(ac_email), "full_name":$(ac_fn)}' $(apiurl)/user/register | jq

# user_verify_email #

user_login: #
	curl -X POST -H "Content-Type: application/json" -d '{"password":$(ac_pass), "email":$(ac_email)}' $(apiurl)/user/login | jq

user_update_fname: # 
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"new_name": "$(new_name)"}' $(apiurl)/user/settings/name | jq

user_update_password: #
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"password":$(ac_pass), "new_password":"rizkia"}' $(apiurl)/user/settings/password | jq

user_update_email: #
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(actoken)" -d '{"password":$(ac_pass), "new_email":$(new_email)}' $(apiurl)/user/settings/email | jq

user_refresh: #
	curl -X POST -H "Content-Type: application/json" -d '{"refresh_token":$(reftoken)}' $(apiurl)/user/token | jq






ad_actoken := "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..7KPW57KEB6eBgVAvw52gag.rKuwqoPG5a2wYC6p_xXoCinnrWnoAfa3yqdejnMvoFrCEE0TuoU8SshAkY3X7-NmLp7Dzq7i1wm3ryOsmnM1_8slDwyam4G1Oqd3JVfvVdVUH6xDD1DIM-B5l5lvY02_IiiFQ46UAc7a-YRzkVx31F5pe82A1J54_cK5SylI7HrJEkghhKoo8oUQJLzIj6laTP4hPF3kcDen9aLALAkBMw.b1wkXmKi9g99jovzOhJ7IA" 

ad_reftoken := "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..6uAb4-vjODv5ZGEswtYW8g.5K5Hpm69mw-q4isEHxqi29_vy2yDMZ-qcaODUklfcNNBimyqwqskbbpUMK29EiLFDTanGjDHyN30vyAI-Xb1mTS7_BJzk2Q_-SLygghdiQTLahsCI7ax36FKyeDjb3OiyLc3gOybWGkD-0hsfcy1WEJHs0Q4sSrOmuUOHFE1NScxLF_Lfhtj0mpMpt_jMLciX6E4JS9QAa6z4BClPtE7Og.5DbcYNl6u_PXM-EH3T8jkA" 

admin_refresh: #
	curl -X POST -H "Content-Type: application/json" -d '{"refresh_token":$(ad_reftoken)}' $(apiurl)/admin/token  | jq .data.access_token

admin_register: #
	curl -X POST -H "Content-Type: application/json" -d '{"password":"$(ac_pass)", "email":"$(ac_email)", "full_name":"$(ac_fn)"}' $(apiurl)/admin/register | jq	

# admin_verify_email : #
	
admin_login: #
	curl -X POST -H "Content-Type: application/json" -d '{"password":"$(ac_pass)", "email":"$(ac_email)"}' $(apiurl)/admin/login | jq

admin_update_fname: #
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(ad_actoken)" -d '{"new_name": "$(new_name)"}' $(apiurl)/admin/settings/name | jq


admin_update_email: #
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(ad_actoken)" -d '{"password":$(ac_pass), "new_email": "$(new_email)"}' $(apiurl)/admin/settings/email | jq

admin_update_password: #
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(ad_actoken)" -d '{"password":"$(ac_pass)", "new_password":"$(new_password)"}' $(apiurl)/admin/settings/password | jq

admin_up_img: #
	curl -X POST -F "file=@tes.jpeg" -H "Authorization: bearer $(ad_actoken)" $(apiurl)/admin/settings/image | jq

ad_id := "c1b500a3-644c-417a-93b8-1c8692045cd0" 

admin_access: #
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(ad_actoken)" -d '{"admin_id": "$(ad_id)" }' $(apiurl)/admin/access | jq

get_team: #
	curl -X GET $(apiurl)/team | jq





title := this is course title
desc := this is the part you write your course description

course_create: #
	curl -X POST -H "Content-Type: application/json" -H "Authorization: bearer $(ad_actoken)" -d '{"title": "$(title)" , "description" : "$(desc)" , "price" : "95000" }' $(apiurl)/course | jq

course_getall: #
	curl -X GET $(apiurl)/course | jq

slug := this-is-course-title

course_getone: #
	curl -X GET $(apiurl)/course/$(slug) | jq

course_update: #
	curl -X PUT -H "Content-Type: application/json" -H "Authorization: bearer $(ad_actoken)" -d '{"title": "$(title)" , "description" : "$(desc)" , "price" : "95000" }' $(apiurl)/course/$(slug) | jq

course_del: #
	curl -X DELETE -H "Authorization: bearer $(ad_actoken)" $(apiurl)/course/$(slug) | jq





