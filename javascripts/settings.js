/**
 * 
 */

var ageChecker = function (value, element) {
	var birthday = moment(value, messages["date.pattern"]);
	if (!birthday.isValid()) {
		return true;
	}
	var age = moment().diff(birthday, "years")
	return this.optional(element) || 
		(age >= 18 && age <= 100);
};

var dateFormatChecker = function(value, element) {
	var birthday = moment(value, messages["date.pattern"]);
	return this.optional(element) || birthday.isValid();
};

$(document).ready(function() {
	
	var phoneMask = messages["phonenumber.mask"];
	$("#phone\\.phoneNumber").mask(phoneMask);
	$("#passport\\.seriaAndNumber").mask("9999 № 999999");
	$("#job\\.phone\\.phoneNumber").mask(phoneMask);
	$("#additionalInfo\\.homePhone\\.phoneNumber").mask(phoneMask);
	$.mask.definitions["C"] = "[\u0410-\u042F]";
	$("#extraDocuments\\.driverLicense").mask("99CC № 999999");
	$("#extraDocuments\\.SNILS").mask("999-999-999 99");
	$("#birthday").mask("99.99.9999");
	
	$.validator.addMethod(
		"age",
		ageChecker,
		messages["validation.birthday.invalidrange"]
	);

	$.validator.addMethod(
			"dateFormat",
			dateFormatChecker,
			messages["typeMismatch.org.joda.time.LocalDate"]
	);

	jQuery.extend(jQuery.validator.messages, {
		required: messages["org.hibernate.validator.constraints.NotEmpty.message"],
		number: messages["typeMismatch.java.lang.Integer"]
	});
	
	$("#privateDataForm").validate({
		onkeyup: false,
		onclick: false,
		onfocusout: false,
		rules: {
			surname: {
				required: true
			},
			name: {
				required: true
			},
			patronymic: {
				required: true
			},
			"phone.phoneNumber": {
				required: true	
			},
			birthday: {
				required: true,
				dateFormat: true,
				age: true
			},
			"passport.birthPlace": {
				required: true
			},
			"passport.seriaAndNumber": {
				required: true
			},
			"passport.registrationAddress": {
				required: true
			},
			"job.salary": {
				number: true
			},
			acceptPolicy: {
				required: true
			},
			acceptPersonalData: {
				required: true
			}
		},
		messages: {
			acceptPolicy: {
				required: messages["validation.policies.privacy.notaccepted"]
			},
			acceptPersonalData: {
				required: messages["validation.policies.personaldata.notaccepted"]
			}
		},
		errorPlacement: function(error, element) {
			var name = element.attr("name");
			if (name == "acceptPolicy" || name == "acceptPersonalData") {
				$(element).next().next().after(error);
			} else {
				error.insertAfter(element);
			}
		}
	});
});