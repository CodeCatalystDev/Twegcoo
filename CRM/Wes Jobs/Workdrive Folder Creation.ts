try 
{
	getNewJob = zoho.crm.getRecordById("Security_Job_Application",JobID);
	query_map = Map();
	query_map.put("sort_order","desc");
	query_map.put("sort_by","Order_Number");
	getJob = zoho.crm.getRecords("Security_Job_Application",1,1,query_map);
	//info getJob.get(0).get("Order_Number");
	if(getJob.get(0).get("Order_Number") != null)
	{
		NewNumber = getJob.get(0).get("Order_Number") + 1;
		newText = NewNumber.leftpad(5).replaceAll(" ","0");
		info newText;
		NewFormat = "TWE" + newText;
		NewSeq = getNewJob.get("Name") + "_" + NewFormat + "_" + JobID;
	}
	else
	{
		NewNumber = 1;
		newText = NewNumber.leftpad(5).replaceAll(" ","0");
		info newText;
		NewFormat = "TWE" + newText;
		NewSeq = getNewJob.get("Name") + "_" + NewFormat + "_" + JobID;
	}
	//getAttachment
	getAttachments = zoho.crm.getRelatedRecords("Attachments","Security_Job_Application",JobID);
	//info getAttachments;
	//
	FolderName = getNewJob.get("Name") + "_" + NewFormat + "_" + JobID;
	createFolder = zoho.workdrive.createFolder(FolderName.tostring(),"p42gl270577bd8fbf4949bdcc583b26846b6d","workdrive");
	URL_Link = createFolder.get("data").get("attributes").get("permalink");
	//Subfolders creation in Workdrive
	// Employment_Agreements = zoho.workdrive.createFolder("Employment Agreements",createFolder.get("data").get("id").toString(),"workdrive");
	// OHSA_Certification = zoho.workdrive.createFolder("OHSA Certifications",createFolder.get("data").get("id").toString(),"workdrive");
	// Vulnerable_Sectors_Check = zoho.workdrive.createFolder("Vulnerable Sectors Check",createFolder.get("data").get("id").toString(),"workdrive");
	// CSA_Orientation_Training = zoho.workdrive.createFolder("CSA Orientation and Training",createFolder.get("data").get("id").toString(),"workdrive");
	updateMap = Map();
	updateMap.put("Sequence_Number",NewFormat);
	updateMap.put("Order_Number",NewNumber);
	updateMap.put("Workdrive_Folder_ID",createFolder.get("data").get("id").toString());
	updateMap.put("Workdrive_URL",URL_Link);
	// updateMap.put("Employment_Agreement_Folder_ID",Employment_Agreements.get("data").get("id").toString());
	// updateMap.put("Employmet_Agreement_URL",Employment_Agreements.get("data").get("attributes").get("permalink"));
	// updateMap.put("OHSA_Certifications_Folder_ID",OHSA_Certification.get("data").get("id").toString());
	// updateMap.put("OHSA_Certification_URL",OHSA_Certification.get("data").get("attributes").get("permalink"));
	// updateMap.put("Vulnerable_Sectors_Check_Folder_ID",Vulnerable_Sectors_Check.get("data").get("id").toString());
	// updateMap.put("Vulnerable_Sectors_Check_URL",Vulnerable_Sectors_Check.get("data").get("attributes").get("permalink"));
	// updateMap.put("CSA_Orientation_Folder_ID",CSA_Orientation_Training.get("data").get("id").toString());
	// updateMap.put("CSA_Orientation_URL",CSA_Orientation_Training.get("data").get("attributes").get("permalink"));
	updateRec = zoho.crm.updateRecord("Security_Job_Application",JobID,updateMap);
	dataList = List();
	data = Map();
	data.put("$link_url",URL_Link);
	data.put("File_Name",FolderName);
	data.put("$resource_id",JobID);
	data.put("$type","teamdrive");
	dataList.add(data);
	//info "dataList " + dataList;
	data = {"data":dataList};
	payload = "attachments=" + zoho.encryption.urlEncode(data.toString());
	//info "payload " + payload;
	resp = invokeurl
	[
		url :"https://www.zohoapis.com/crm/v4/Security_Job_Application/" + JobID + "/Attachments"
		type :POST
		parameters:payload
		connection:"zohocrm"
		content-type:"application/x-www-form-urlencoded"
	];
	//info "resp " + resp;
	for each  recattach in getAttachments
	{
		attachmentUpload = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v4/Security_Job_Application/" + JobID + "/Attachments/" + recattach.get("id")
			type :GET
			connection:"zohocrm"
		];
		//info attachmentUpload;
		//Attachment upload in workdrive
		fileUpload = zoho.workdrive.uploadFile(attachmentUpload,createFolder.get("data").get("id").toString(),attachmentUpload,true,"workdrive");
		//search = zoho.crm.searchRecords("Job_Applications","(Lead_Source:equals:Appraiser)",1,200,query_map);
		//PDF attachment delete
		deleteAttachment = invokeurl
		[
			url :"https://www.zohoapis.com/crm/v2/Security_Job_Application/" + JobID + "/Attachments/" + recattach.get("id")
			type :DELETE
			connection:"zohocrm"
		];
		//info deleteAttachment;
	}
}
catch (e)
{
	info "catch " + e;
}
