var profile_info={};




function ajax_get(url,token,page)
{	
	var token=document.cookie.split("=")[1].split(";")[0];
	var query=new XMLHttpRequest();
	query.onreadystatechange=function(){
			
		if(query.readyState==4 && query.status==200)
		{	
			if(page=="home")
			{
			var profile=JSON.parse(query.responseText).user_profile[0];
			$("#personal-info").text((profile.first_name+" "+
									 profile.last_name
									 
								).toUpperCase());
			$("#personal-info").append("<br>"+
									(profile.user_father_name).toUpperCase());
			}
			if(page=="subjects")
			{
				var subs=JSON.parse(query.responseText).subjects;
				
				var menu=document.getElementsByClassName("menu-item");

				for (var i = 0; i < menu.length; i++) 
				{	
			    var home_subjects=menu[i].getElementsByClassName("subjects");
			   
				//	
				for (var k = 0; k < subs.length; k++) 
				{
					home_subjects[k].innerHTML=subs[k];
				}
				for (var j = k; j < home_subjects.length; j++) 
				{
					home_subjects[j].style.display="none";
				}
				}	
			}
			if(page=="announcements")
			{
				console.log(JSON.parse(query.responseText))
				var announcements=JSON.parse(query.responseText).data;
				
				var page_announce=document.getElementsByClassName("announce");

				for (var i = 0; i < announcements.length; i++) 
				{	
			      page_announce[i].getElementsByClassName("announce-header")[i].innerHTML=announcements[i].title+"<small>,  "+announcements[i].time+"</small>";
			   	  page_announce[i].getElementsByClassName("announce-text")[i].innerHTML=announcements[i].text;
			   			
				}
				for (var j = i; j < page_announce.length; j++) {
						page_announce[j].style.display="none";
					}	
			}
		}	
	}

	query.open("GET",url+"?t="+Math.random(),true);
	query.setRequestHeader("Authorization","Token "+token);
	query.send();
}
