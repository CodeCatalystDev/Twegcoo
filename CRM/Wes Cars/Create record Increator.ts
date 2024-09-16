/****Name : Ananth        345693000109014370
	 Date : 26-Jun-2023
	 Description : When Job Application is created in Car-s- Job Application, it will create in Creator *******/
getJob = zoho.crm.getRecordById("Job_Applications",JobID);
//info getJob;
createMap = Map();
//Zoho Form Fields
createMap.put("Are_you_legally_entitled_to_work_in_Canada",getJob.get("Are_you_legally_entitled_to_work_in_Canada"));
createMap.put("How_did_you_come_to_learn_about_this_job_posting",getJob.get("How_did_you_come_to_learn_about_this_job_posting"));
createMap.put("Applicant_s_Name",getJob.get("Name"));
createMap.put("Your_First_Name",getJob.get("Name").getPrefix(" "));
createMap.put("Your_Last_Name",getJob.get("Name").getSuffix(" "));
createMap.put("Your_Email",getJob.get("Email"));
createMap.put("Your_Phone_Number",getJob.get("Phone_No"));
createMap.put("Street_Address",getJob.get("Address_Line_1"));
createMap.put("Address_Line_2",getJob.get("Address_Line_2"));
createMap.put("City",getJob.get("City"));
createMap.put("State_Region_Province",getJob.get("Province"));
// createMap.put("Country", getJob.get("Are_you_legally_entitled_to_work_in_Canada"));
createMap.put("Postal_Zip_Code",getJob.get("Postal_Code"));
createMap.put("What_type_of_similar_experience_do_you_have_that_would_match_to_this_role",getJob.get("What_type_of_similar_experience_do_you_have_that_w"));
createMap.put("Availability_to_Work",getJob.get("Work_Availability"));
createMap.put("Intersection_of_Interest",getJob.get("Intersection_of_Interest"));
createMap.put("Do_you_have_access_to_a_smart_phone_with_a_data_plan",getJob.get("Do_you_have_access_to_a_smart_phone_with_a_data_pl"));
createMap.put("This_position_will_have_the_physical_requirement_of_standing_outside_for_1_5_hour_time_spans_Will",getJob.get("Physical_requirement_of_standing_outside_1_5_hrs2"));
createMap.put("Tell_us_what_makes_you_a_a_great_fit_to_work_as_a_Crosswalk_Safety_Ambassador_a_k_a_Crossing_Guard",getJob.get("What_makes_you_a_a_great_fit_to_work_as_a_CSA"));
createMap.put("Tell_us_how_you_demonstrate_quality_and_pride_in_your_work",getJob.get("How_you_demonstrate_quality_pride_in_your_work"));
createMap.put("Are_you_comfortable_with_dealing_with_the_public_and_are_able_to_respond_to_inquires_in_a_tactful",getJob.get("Are_you_comfortable_with_dealing_with_the_public"));
createMap.put("Are_you_comfortable_with_working_independently_with_minimal_supervision",getJob.get("Are_you_comfortable_with_working_independently"));
//CRM Fields
if(getJob.get("Date_Submitted") != null && getJob.get("Date_Submitted") != "")
{
	createMap.put("Date_Submitted",getJob.get("Date_Submitted").toDate());
}
createMap.put("Alternate_Contract",getJob.get("Alternate_Contract").toList());
createMap.put("Recruiter",getJob.get("Recruiter"));
createMap.put("Status",getJob.get("Company"));
createMap.put("Which_Carraway_Rep",getJob.get("Which_Carraway_Rep"));
createMap.put("Name_of_who_Referred_you",getJob.get("Name_of_who_Referred_you"));
//createMap.put("What_makes_you_a_a_great_fit_to_work_as_a_CSA",getJob.get("What_makes_you_a_a_great_fit_to_work_as_a_CSA"));
//createMap.put("How_you_demonstrate_quality_pride_in_your_work",getJob.get("How_you_demonstrate_quality_pride_in_your_work"));
createMap.put("Applicant_Stage",getJob.get("Applicant_Stage"));
createMap.put("Form_Name",getJob.get("Form_Name"));
createMap.put("Company",getJob.get("Company1"));
createMap.put("Unassigned_Flow_Entry_Date",zoho.currentdate);
createMap.put("Employment_Full_Name_Match",getJob.get("Employment_Full_Name_Match"));
createMap.put("Previous_Employment_Status",getJob.get("Previous_Employment_Status").toList());
createMap.put("Primary_Data_Source",getJob.get("Primary_Data_Source"));
createMap.put("All_Data_Sources",getJob.get("All_Data_Sources").toList());
createMap.put("Unassigned_follow_up_workflow",getJob.get("Unassigned_follow_up_workflow"));
createMap.put("ZCRM_ID",getJob.get("id"));
//
createMap.put("Unscreened_follow_up_workflow",getJob.get("Unscreened_follow_up_workflow"));
createMap.put("Unscreened_Flow_Entry_Date",getJob.get("Unscreened_Flow_Entry_Date"));
createMap.put("Sent_zoom_invite",getJob.get("Sent_zoom_invite"));
createMap.put("Sent_Time",getJob.get("Sent_Time"));
createMap.put("Employment_Agreement",getJob.get("Employment_Agreement"));
createMap.put("Vulnerable_Sectors_Check",getJob.get("Vulnerable_Sectors_Check"));
createMap.put("OHSA_Certification",getJob.get("OHSA_Certification"));
createMap.put("Complete_the_CSA_Orientation_and_Training",getJob.get("Complete_the_CSA_Orientation_and_Training"));
createMap.put("Moved_to_Review",getJob.get("Moved_to_Review"));
createMap.put("Completed_Training",getJob.get("Completed_Training"));
createMap.put("Attempt",getJob.get("Attempt"));
createMap.put("Uploaded_Certificate",getJob.get("Uploaded_Certificate"));
createJobInCreator = zoho.creator.createRecord("silvia_gatsbyvalet","twegco-cloudlion-job-tracker","Crosswalk_Ambassador_Job_Application_Form",createMap,Map(),"zohocreator");
info "createJobInCreator -> " + createJobInCreator;
if(createJobInCreator.containKey("code") == true)
{
	if(createJobInCreator.get("code") == 3000)
	{
		upmap = Map();
		upmap.put("Creator_ID",createJobInCreator.get("data").get("ID"));
		updateRec = zoho.crm.updateRecord("Job_Applications",getJob.get("id"),upmap);
	}
}
