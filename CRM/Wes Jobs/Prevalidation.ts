getWES = zoho.crm.getRecordById("Security_Job_Application",WES_ID);
info getWES;
info getWES.get("Email");
/*******Pre-Validation on Leads (Employess) module **********/
//Search Employee by Email
searchEmployeeByEmail = zoho.crm.searchRecords("Leads","(Email:equals:" + getWES.get("Email") + ")");
data_map = Map();
tag_list = List();
preValidationTag = false;
newLine = hexToText("0A");
if(searchEmployeeByEmail.size() > 0)
{
	preValidationTag = true;
	notesMap = Map();
	notesMap.put("Note_Title","Employment Email based Pre-Validation ");
	notesContent = "";
	employmentStatuslist = list();
	s_no = 0;
	for each  emp in searchEmployeeByEmail
	{
		//fetching the Employee Status 
		employeeStatus = emp.get("Employment_Status");
		info employeeStatus;
		// 		TagMap = Map();
		// 		TagMap.put("name",employeeStatus);
		// 		tag_list.add(TagMap);
		if(employmentStatuslist.contains(employeeStatus) == false)
		{
			employmentStatuslist.add(employeeStatus);
		}
		employeeNumber = emp.get("Employee_No");
		employeeFirstName = emp.get("First_Name");
		employeeLastName = emp.get("Last_Name");
		employeeRecID = emp.get("id");
		s_no = s_no + 1;
		notesContent = notesContent + s_no + "." + employeeNumber + " - " + employeeFirstName + " " + employeeLastName + " - " + employeeStatus + " - " + newLine + "  https://crm.zoho.com/crm/org5424931/tab/Leads/" + employeeRecID + newLine;
	}
	info notesContent;
	notesMap.put("Note_Content",notesContent);
	notesMap.put("Parent_Id",WES_ID);
	notesMap.put("se_module","Security_Job_Application");
	createNotes = zoho.crm.createRecord("Notes",notesMap);
	data_map.put("Previous_Employment_Status_Employee",employmentStatuslist);
	TagMap1 = Map();
	TagMap1.put("name","Multi-Match");
	tag_list.add(TagMap1);
	if(searchEmployeeByEmail.size() > 1)
	{
		data_map.put("Employment_Email_Match_Employee","Yes - More than 1 match");
	}
	else if(searchEmployeeByEmail.size() == 1)
	{
		data_map.put("Employment_Email_Match_Employee","Yes - 1 match");
	}
}
else
{
	data_map.put("Employment_Email_Match_Employee","No");
}
//Searching Employee BY Name
searchEmployeeByName = zoho.crm.searchRecords("Leads","(Full_Name:equals:" + getWES.get("Name") + ")");
//info searchEmployeeByName;
if(searchEmployeeByName.size() > 0)
{
	preValidationTag = true;
	notesMap1 = Map();
	notesMap1.put("Note_Title","Employment Full Name Based Pre-Validation");
	notesContent1 = "";
	s_no1 = 0;
	for each  emp1 in searchEmployeeByName
	{
		employeeStatus1 = emp1.get("Employment_Status");
		employeeNumber1 = emp1.get("Employee_No");
		employeeFirstName1 = emp1.get("First_Name");
		employeeLastName1 = emp1.get("Last_Name");
		employeeRecID1 = emp1.get("id");
		s_no1 = s_no1 + 1;
		notesContent1 = notesContent1 + s_no1 + "." + employeeNumber1 + " - " + employeeFirstName1 + " " + employeeLastName1 + " - " + employeeStatus1 + " - " + newLine + "  https://crm.zoho.com/crm/org5424931/tab/Leads/" + employeeRecID1 + newLine;
	}
	info notesContent1;
	notesMap1.put("Note_Content",notesContent1);
	notesMap1.put("Parent_Id",WES_ID);
	notesMap1.put("se_module","Security_Job_Application");
	createNotes1 = zoho.crm.createRecord("Notes",notesMap1);
	TagMap1 = Map();
	TagMap1.put("name","Multi-Match");
	tag_list.add(TagMap1);
	if(searchEmployeeByName.size() == 1)
	{
		data_map.put("Employment_Full_Name_Match_Employee","Yes - 1 match");
	}
	else if(searchEmployeeByName.size() > 1)
	{
		data_map.put("Employment_Full_Name_Match_Employee","Yes - More than 1 match");
	}
}
else
{
	data_map.put("Employment_Full_Name_Match_Employee","No");
}
phone = getWES.get("Phone_Number");
rawNumber = phone.replaceAll("\(","").replaceAll("\)","").replaceAll("-","").replaceAll("/","").replaceAll(" ","");
//Phone Match on Employees
//getRelatedPhoneEmp = zoho.crm.searchRecords("Leads","(Cell_Phone:equals:" + getWES.get("Phone_Number") + ")");
query = "select Cell_Phone from Leads where (((Cell_Phone like '%" + rawNumber.subString(0,3) + "%') and (Cell_Phone like '%" + rawNumber.subString(3,6) + "%')) and (Cell_Phone like '%" + rawNumber.subString(6) + "%'))";
queryMap = Map();
queryMap.put("select_query",query);
getRelatedPhoneEmp = invokeurl
[
	url :"https://www.zohoapis.com/crm/v5/coql"
	type :POST
	parameters:queryMap.toString()
	connection:"zcrm"
];
CountEmp = 0;
if(getRelatedPhoneEmp.get("data").size() > 1)
{
	preValidationTag = true;
	notesContentEmp = "";
	for each  rec_emp in getRelatedPhoneEmp.get("data")
	{
		CountEmp = CountEmp + 1;
		getEmp = zoho.crm.getRecordById("Leads",rec_emp.get("id"));
		notesContentEmp = notesContentEmp + CountEmp + "." + getEmp.get("Employee_No") + " - " + getEmp.get("First_Name") + " " + getEmp.get("Last_Name") + " - " + getEmp.get("Employment_Status") + " - " + newLine + "  https://crm.zoho.com/crm/org5424931/tab/Leads/" + getEmp.get("id") + newLine;
	}
	notesMapEmp = Map();
	notesMapEmp.put("Note_Title","Employment Phone based Pre-Validation");
	notesMapEmp.put("Note_Content",notesContentEmp);
	notesMapEmp.put("Parent_Id",WES_ID);
	notesMapEmp.put("se_module","Security_Job_Application");
	createNotesEmp = zoho.crm.createRecord("Notes",notesMapEmp);
	TagMap1 = Map();
	TagMap1.put("name","Multi-Match");
	tag_list.add(TagMap1);
	if(CountEmp > 1)
	{
		data_map.put("Employment_Phone_Match_Employee","Yes - More than 1 match");
	}
	else if(CountEmp == 1)
	{
		data_map.put("Employment_Phone_Match_Employee","Yes - 1 match");
	}
}
else
{
	data_map.put("Employment_Phone_Match_Employee","No");
}
if(searchEmployeeByEmail.size() == 0 && searchEmployeeByName.size() == 0 && getRelatedPhoneEmp.size() == 0)
{
	TagMap = Map();
	TagMap.put("name","Fresh Candidate");
	tag_list.add(TagMap);
}
/*******Pre-Validation on WES Job Application (Security_Job_Application) module **********/
//Email based validation on WES Application (Same Module)
getRelatedJob = zoho.crm.searchRecords("Security_Job_Application","(Email:equals:" + getWES.get("Email") + ")");
//info getRelatedJob;
EmailList = List();
StageList = List();
//tag_list = List();
EmailCount = 0;
if(getRelatedJob.size() > 1)
{
	preValidationTag = true;
	info "Email";
	for each  rec in getRelatedJob
	{
		if(rec.get("id") != WES_ID)
		{
			EmailList.add(rec.get("id"));
			StageList.add(rec.get("Employment_Stage"));
			TagMap3 = Map();
			TagMap3.put("name",rec.get("Employment_Stage"));
			tag_list.add(TagMap3);
		}
	}
	notesContent3 = "This candidate already in the system in the following Stages : ";
	for each  rec1 in EmailList
	{
		EmailJob = zoho.crm.getRecordById("Security_Job_Application",rec1);
		notesContent3 = notesContent3 + newLine + EmailJob.get("Funnel_Stage") + " - " + "https://crm.zoho.com/crm/org5424931/tab/CustomModule28/" + rec1;
	}
	notesMap3 = Map();
	notesMap3.put("Note_Title","Email match on Existing WES Applications");
	notesMap3.put("Note_Content",notesContent3);
	notesMap3.put("Parent_Id",WES_ID);
	notesMap3.put("se_module","Security_Job_Application");
	createNotes3 = zoho.crm.createRecord("Notes",notesMap3);
	if(EmailCount > 1)
	{
		data_map.put("Candidate_Email_Match_WES","Yes - More than 1 match");
	}
	else if(EmailCount == 1)
	{
		data_map.put("Candidate_Email_Match_WES","Yes - 1 match");
	}
}
else
{
	data_map.put("Candidate_Email_Match_WES","No");
}
//Applicant Name based checking
getRelatedJobName = zoho.crm.searchRecords("Security_Job_Application","(Name:equals:" + getWES.get("Name") + ")");
//info getRelatedJob;
NameList = List();
NameCount = 0;
if(getRelatedJobName.size() > 1)
{
	preValidationTag = true;
	info "Name";
	for each  recName in getRelatedJobName
	{
		if(recName.get("id") != WES_ID)
		{
			NameCount = NameCount + 1;
			NameList.add(recName.get("id"));
			StageList.add(recName.get("Employment_Stage"));
			TagMap4 = Map();
			TagMap4.put("name",recName.get("Employment_Stage"));
			tag_list.add(TagMap4);
		}
	}
	notesContent4 = "This applicant already in the system in the following Stages : ";
	for each  rec2 in NameList
	{
		NameJob = zoho.crm.getRecordById("Security_Job_Application",rec2);
		notesContent4 = notesContent4 + newLine + NameJob.get("Funnel_Stage") + " - " + "https://crm.zoho.com/crm/org5424931/tab/CustomModule28/" + rec2;
	}
	notesMap4 = Map();
	notesMap4.put("Note_Title","Applicant Name match on Existing WES Applications");
	notesMap4.put("Note_Content",notesContent4);
	notesMap4.put("Parent_Id",WES_ID);
	notesMap4.put("se_module","Security_Job_Application");
	createNotes4 = zoho.crm.createRecord("Notes",notesMap4);
	if(NameCount > 1)
	{
		data_map.put("Candidate_Full_Name_Match_WES","Yes - More than 1 match");
	}
	else if(NameCount == 1)
	{
		data_map.put("Candidate_Full_Name_Match_WES","Yes - 1 match");
	}
}
else
{
	data_map.put("Candidate_Full_Name_Match_WES","No");
}
//Phone Match on WES Job Application
//getRelatedJobPhone = zoho.crm.searchRecords("Security_Job_Application","(Phone_Number:equals:" + getWES.get("Phone_Number") + ")");
query1 = "select Phone_Number from Security_Job_Application where (((Phone_Number like '%" + rawNumber.subString(0,3) + "%') and (Phone_Number like '%" + rawNumber.subString(3,6) + "%')) and (Phone_Number like '%" + rawNumber.subString(6) + "%'))";
queryMap1 = Map();
queryMap1.put("select_query",query1);
getRelatedJobPhone = invokeurl
[
	url :"https://www.zohoapis.com/crm/v5/coql"
	type :POST
	parameters:queryMap1.toString()
	connection:"zcrm"
];
CountWES = 0;
if(getRelatedJobPhone.get("data").size() > 1)
{
	preValidationTag = true;
	info "Phone";
	notesContentWES = "This applicant already in the system in the following Stages : ";
	for each  rec_WES in getRelatedJobPhone.get("data")
	{
		if(rec_WES.get("id") != WES_ID)
		{
			StageList.add(rec_WES.get("Employment_Stage"));
			TagMap5 = Map();
			TagMap5.put("name",rec_WES.get("Employment_Stage"));
			tag_list.add(TagMap5);
			CountWES = CountWES + 1;
			getWES = zoho.crm.getRecordById("Security_Job_Application",rec_WES.get("id"));
			notesContentWES = notesContentWES + newLine + rec_WES.get("Funnel_Stage") + " - " + "https://crm.zoho.com/crm/org5424931/tab/CustomModule28/" + rec_WES.get("id");
		}
	}
	notesMapWES = Map();
	notesMapWES.put("Note_Title","Phone match on Existing WES Applications");
	notesMapWES.put("Note_Content",notesContentWES);
	notesMapWES.put("Parent_Id",WES_ID);
	notesMapWES.put("se_module","Security_Job_Application");
	createNotesWES = zoho.crm.createRecord("Notes",notesMapWES);
	if(CountWES > 1)
	{
		data_map.put("Candidate_Phone_Match_WES","Yes - More than 1 match");
	}
	else if(CountWES == 1)
	{
		data_map.put("Candidate_Phone_Match_WES","Yes - 1 match");
	}
}
else
{
	data_map.put("Candidate_Phone_Match_WES","No");
}
//data_map.put("Tag",tag_list);
//updating Other Modules Validation
//CAR_S Module
getWES1 = zoho.crm.getRecordById("Security_Job_Application",WES_ID);
notesNum = 0;
notesData = "";
searchCar_sModuleRecordList = list();
searchCar_sModuleByEmail = zoho.crm.searchRecords("Job_Applications","(Email:equals:" + getWES1.get("Email") + ")");
//info searchCar_sModuleByEmail;
if(searchCar_sModuleByEmail.size() > 0)
{
	info "email " + getWES.get("Email");
	info "Cemail";
	for each  searchCar_sModuleByEmailRec in searchCar_sModuleByEmail
	{
		searchCar_sModuleRecordList.add(searchCar_sModuleByEmailRec.get("id"));
	}
}
searchCar_sModuleByName = zoho.crm.searchRecords("Job_Applications","(Name:equals:" + getWES1.get("Name") + ")");
//info searchCar_sModuleByName.size();
if(searchCar_sModuleByName.size() > 0)
{
	info "name_" + getWES.get("Name");
	for each  searchCar_sModuleByNameRec in searchCar_sModuleByName
	{
		//info searchCar_sModuleByNameRec;
		searchCar_sModuleRecordList.add(searchCar_sModuleByNameRec.get("id"));
	}
}
//searchCar_sModuleByPhone = zoho.crm.searchRecords("Job_Applications","(Phone_No:equals:" + getWES1.get("Phone_Number") + ")");
query2 = "select Phone_No from Job_Applications where (((Phone_No like '%" + rawNumber.subString(0,3) + "%') and (Phone_No like '%" + rawNumber.subString(3,6) + "%')) and (Phone_No like '%" + rawNumber.subString(6) + "%'))";
queryMap2 = Map();
queryMap2.put("select_query",query2);
searchCar_sModuleByPhone = invokeurl
[
	url :"https://www.zohoapis.com/crm/v5/coql"
	type :POST
	parameters:queryMap2.toString()
	connection:"zcrm"
];
if(searchCar_sModuleByPhone.get("data").size() > 0)
{
	info "Cphone";
	for each  searchCar_sModuleByPhoneRec in searchCar_sModuleByPhone.get("data")
	{
		searchCar_sModuleRecordList.add(searchCar_sModuleByPhoneRec.get("id"));
	}
}
//info "search"+ searchCar_sModuleRecordList;
Car_sModuleRecordListDistinct = searchCar_sModuleRecordList.distinct();
info Car_sModuleRecordListDistinct;
if(Car_sModuleRecordListDistinct.size() > 0)
{
	existingCar_sStages1toUpdate = list();
	for each  Car_sModuleRecordListDistinctRec in Car_sModuleRecordListDistinct
	{
		getCarSRecord = zoho.crm.getRecordById("Job_Applications",Car_sModuleRecordListDistinctRec.toNumber());
		//info getCarSRecord;
		existingStages1 = getCarSRecord.get("Existing_Applicant_Stages").toList();
		//info getCarSRecord.get("Existing_Applicant_Stages").toList();
		//8. Rejected; 9. Abandonment
		//info existingStages1.contains("8. Rejected") == true || existingStages1.contains("9. Abandonment") == true;
		if(existingStages1.contains("8. Rejected") == true || existingStages1.contains("9. Abandonment") == true)
		{
			if(existingStages1.contains("8. Rejected") == true)
			{
				existingCar_sStages1toUpdate.add("8. Rejected");
			}
			if(existingStages1.contains("9. Abandonment") == true)
			{
				existingCar_sStages1toUpdate.add("9. Abandonment");
			}
			notesNum = notesNum + 1;
			notesData = notesData + notesNum + ".CAR-S - Job Application - " + getCarSRecord.get("Name") + " - " + "https://crm.zoho.com/crm/org5424931/tab/CustomModule5/" + getCarSRecord.get("id") + newLine;
		}
	}
	info existingCar_sStages1toUpdate.isEmpty();
	if(existingCar_sStages1toUpdate.isEmpty() == false)
	{
		preValidationTag = true;
		//info existingCar_sStages1toUpdate;
		data_map.put("CAR_S_Job_Application_Match","Yes");
		data_map.put("Existing_CAR_S_Job_Applicant_Stages",existingCar_sStages1toUpdate.distinct());
	}
}
//CAR_P Module
searchCar_pModuleRecordList = list();
searchCar_pModuleByEmail = zoho.crm.searchRecords("Carr_Parking_Applications","(Email:equals:" + getWES1.get("Email") + ")");
info searchCar_pModuleByEmail;
if(searchCar_pModuleByEmail.size() > 0)
{
	for each  searchCar_pModuleByEmailRec in searchCar_pModuleByEmail
	{
		searchCar_pModuleRecordList.add(searchCar_pModuleByEmailRec.get("id"));
	}
}
searchCar_pModuleByName = zoho.crm.searchRecords("Carr_Parking_Applications","(Name:equals:" + getWES1.get("Name") + ")");
if(searchCar_pModuleByName.size() > 0)
{
	for each  searchCar_pModuleByNameRec in searchCar_pModuleByName
	{
		searchCar_pModuleRecordList.add(searchCar_pModuleByNameRec.get("id"));
	}
}
//searchCar_pModuleByPhone = zoho.crm.searchRecords("Carr_Parking_Applications","(Phone_No:equals:" + getWES1.get("Phone_Number") + ")");
query3 = "select Phone_No from Carr_Parking_Applications where (((Phone_No like '%" + rawNumber.subString(0,3) + "%') and (Phone_No like '%" + rawNumber.subString(3,6) + "%')) and (Phone_No like '%" + rawNumber.subString(6) + "%'))";
queryMap3 = Map();
queryMap3.put("select_query",query3);
searchCar_pModuleByPhone = invokeurl
[
	url :"https://www.zohoapis.com/crm/v5/coql"
	type :POST
	parameters:queryMap3.toString()
	connection:"zcrm"
];
if(searchCar_pModuleByPhone.get("data").size() > 0)
{
	for each  searchCar_pModuleByPhoneRec in searchCar_pModuleByPhone.get("data")
	{
		searchCar_pModuleRecordList.add(searchCar_pModuleByPhoneRec.get("id"));
	}
}
Car_pModuleRecordListDistinct = searchCar_pModuleRecordList.distinct();
if(Car_pModuleRecordListDistinct.size() > 0)
{
	existingCar_pStages2toUpdate = list();
	for each  Car_pModuleRecordListDistinctRec in Car_pModuleRecordListDistinct
	{
		getCarPRecord = zoho.crm.getRecordById("Carr_Parking_Applications",Car_pModuleRecordListDistinctRec.toNumber());
		existingStages2 = getCarPRecord.get("Stage").toList();
		if(existingStages2.contains("Application Rejected") == true)
		{
			preValidationTag = true;
			info "CArp Application";
			existingCar_pStages2toUpdate.add("Application Rejected");
			notesNum = notesNum + 1;
			notesData = notesData + notesNum + ". CAR-P - Job Application - " + getCarPRecord.get("Name") + " - " + "https://crm.zoho.com/crm/org5424931/tab/CustomModule15/" + getCarPRecord.get("id") + newLine;
		}
	}
	if(existingCar_pStages2toUpdate.isEmpty() == false)
	{
		data_map.put("CAR_P_Job_Application_Match","Yes");
		data_map.put("Existing_CAR_P_Job_Applicant_Stages",existingCar_pStages2toUpdate.distinct());
	}
}
//GAT - Job Application Module
searchGatJobApplicationRecordList = list();
searchGatJobApplicationModuleByEmail = zoho.crm.searchRecords("West_Egg_Applications","(Email:equals:" + getWES1.get("Email") + ")");
if(searchGatJobApplicationModuleByEmail.size() > 0)
{
	for each  searchGatJobApplicationModuleByEmailRec in searchGatJobApplicationModuleByEmail
	{
		searchGatJobApplicationRecordList.add(searchGatJobApplicationModuleByEmailRec.get("id"));
	}
}
// want to check with name
searchGatJobApplicationModuleByName = zoho.crm.searchRecords("West_Egg_Applications","(Name:equals:" + getWES1.get("Name") + ")");
//searchGatJobApplicationModuleByPhone = zoho.crm.searchRecords("West_Egg_Applications","(Phone_No:equals:" + getWES1.get("Phone_Number") + ")");
query4 = "select Phone_No from West_Egg_Applications where (((Phone_No like '%" + rawNumber.subString(0,3) + "%') and (Phone_No like '%" + rawNumber.subString(3,6) + "%')) and (Phone_No like '%" + rawNumber.subString(6) + "%'))";
queryMap4 = Map();
queryMap4.put("select_query",query4);
searchGatJobApplicationModuleByPhone = invokeurl
[
	url :"https://www.zohoapis.com/crm/v5/coql"
	type :POST
	parameters:queryMap4.toString()
	connection:"zcrm"
];
if(searchGatJobApplicationModuleByPhone.get("data").size() > 0)
{
	for each  searchGatJobApplicationModuleByPhoneRec in searchGatJobApplicationModuleByPhone.get("data")
	{
		searchGatJobApplicationRecordList.add(searchGatJobApplicationModuleByPhoneRec.get("id"));
	}
}
GatJobApplicationRecordListDistinct = searchGatJobApplicationRecordList.distinct();
if(GatJobApplicationRecordListDistinct.size() > 0)
{
	existingGatJobApplication3toUpdate = list();
	for each  GatJobApplicationRecordListDistinctRec in GatJobApplicationRecordListDistinct
	{
		getGatJobApplication = zoho.crm.getRecordById("West_Egg_Applications",GatJobApplicationRecordListDistinctRec.toNumber());
		existingStages3 = getGatJobApplication.get("Stage").toList();
		if(existingStages3.contains("9-1. Reject") == true || existingStages3.contains("9-2. Abandon") == true || existingStages3.contains("9-4. Duplicate") == true)
		{
			if(existingStages3.contains("9-1. Reject") == true)
			{
				existingGatJobApplication3toUpdate.add("9-1. Reject");
			}
			if(existingStages3.contains("9-2. Abandon") == true)
			{
				existingGatJobApplication3toUpdate.add("9-2. Abandon");
			}
			if(existingStages3.contains("9-4. Duplicate") == true)
			{
				existingGatJobApplication3toUpdate.add("9-4. Duplicate");
			}
			notesNum = notesNum + 1;
			notesData = notesData + notesNum + ". GAT - Job Application - " + getGatJobApplication.get("Name") + " - " + "https://crm.zoho.com/crm/org5424931/tab/CustomModule16/" + getGatJobApplication.get("id") + newLine;
		}
	}
	if(existingGatJobApplication3toUpdate.isEmpty() == false)
	{
		preValidationTag = true;
		data_map.put("GAT_Job_Application_Match","Yes");
		data_map.put("Existing_GAT_Job_Applicant_Stages",existingGatJobApplication3toUpdate.distinct());
	}
}
//RED - Job Application
searchRedJobApplicationModuleRecordList = list();
searchRedJobApplicationModuleByEmail = zoho.crm.searchRecords("RED_Staffing_Applications","(Email:equals:" + getWES1.get("Email") + ")");
if(searchRedJobApplicationModuleByEmail.size() > 0)
{
	for each  searchRedJobApplicationModuleByEmailRec in searchRedJobApplicationModuleByEmail
	{
		searchRedJobApplicationModuleRecordList.add(searchRedJobApplicationModuleByEmailRec.get("id"));
	}
}
searchRedJobApplicationModuleByName = zoho.crm.searchRecords("RED_Staffing_Applications","(Name:equals:" + getWES1.get("Name") + ")");
if(searchRedJobApplicationModuleByName.size() > 0)
{
	for each  searchRedJobApplicationModuleByNameRec in searchRedJobApplicationModuleByName
	{
		searchRedJobApplicationModuleRecordList.add(searchRedJobApplicationModuleByNameRec.get("id"));
	}
}
//searchRedJobApplicationModuleByPhone = zoho.crm.searchRecords("RED_Staffing_Applications","(Phone_No:equals:" + getWES1.get("Phone_Number") + ")");
query5 = "select Phone_No from RED_Staffing_Applications where (((Phone_No like '%" + rawNumber.subString(0,3) + "%') and (Phone_No like '%" + rawNumber.subString(3,6) + "%')) and (Phone_No like '%" + rawNumber.subString(6) + "%'))";
queryMap5 = Map();
queryMap5.put("select_query",query5);
searchRedJobApplicationModuleByPhone = invokeurl
[
	url :"https://www.zohoapis.com/crm/v5/coql"
	type :POST
	parameters:queryMap5.toString()
	connection:"zcrm"
];
if(searchRedJobApplicationModuleByPhone.get("data").size() > 0)
{
	for each  searchRedJobApplicationModuleByPhoneRec in searchRedJobApplicationModuleByPhone.get("data")
	{
		searchRedJobApplicationModuleRecordList.add(searchRedJobApplicationModuleByPhoneRec.get("id"));
	}
}
RedJobApplicationModuleRecordDistinct = searchRedJobApplicationModuleRecordList.distinct();
if(RedJobApplicationModuleRecordDistinct.size() > 0)
{
	existingRedJobApplicationStagestoUpdate = list();
	for each  RedJobApplicationModuleRecordDistinctRec in RedJobApplicationModuleRecordDistinct
	{
		getRedJobApplication = zoho.crm.getRecordById("RED_Staffing_Applications",RedJobApplicationModuleRecordDistinctRec.toNumber());
		existingStages4 = getRedJobApplication.get("Status").toList();
		if(existingStages4.contains("Rejected") == true)
		{
			existingRedJobApplicationStagestoUpdate.add("Rejected");
			notesNum = notesNum + 1;
			notesData = notesData + notesNum + ". Red - Job Application - " + getRedJobApplication.get("Name") + " - " + "https://crm.zoho.com/crm/org5424931/tab/CustomModule19/" + getRedJobApplication.get("id") + newLine;
		}
	}
	if(existingRedJobApplicationStagestoUpdate.isEmpty() == false)
	{
		preValidationTag = true;
		data_map.put("RED_Job_Application_Match","Yes");
		data_map.put("Existing_RED_Job_Applicant_stages",existingRedJobApplicationStagestoUpdate.distinct());
	}
}
if(notesData != "" && notesNum != 0)
{
	info notesData;
	notesModuleValidation = Map();
	notesModuleValidation.put("Note_Title","Other Module Validations");
	notesModuleValidation.put("Note_Content",notesData);
	notesModuleValidation.put("Parent_Id",WES_ID);
	notesModuleValidation.put("se_module","Security_Job_Application");
	createNotesModuleValidation = zoho.crm.createRecord("Notes",notesModuleValidation);
	info "Notes : " + createNotesModuleValidation;
}
tag_list1 = list();
if(preValidationTag == true)
{
	TagMapValidation = Map();
	TagMapValidation.put("name","Pre-Validation Flagged");
	tag_list1.add(TagMapValidation);
	//TagMapValidation.add("Pre-Validation Flagged");
}
else
{
	TagMapValidation = Map();
	TagMapValidation.put("name","Fresh Candidate");
	//TagMapValidation.add("Fresh Candidate");
	tag_list1.add(TagMapValidation);
}
//info data_map;
data_map.put("Tag",tag_list1);
info data_map;
updateRecord = zoho.crm.updateRecord("Security_Job_Application",WES_ID,data_map);
info "updateRecord " + updateRecord;
