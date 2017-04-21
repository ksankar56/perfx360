/*=========================================================================================
	File Name: sweet-alerts.js
	Description: A beautiful replacement for javascript alerts
	----------------------------------------------------------------------------------------
	Item Name: Robust - Responsive Admin Theme
	Version: 1.2
	Author: GeeksLabs
	Author URL: http://www.themeforest.net/user/geekslabs
==========================================================================================*/
$(document).ready(function(){

	$('.cancel-button').on('click',function(){
		swal({
		    title: "Are you sure?",
		    text: "You will not be able to recover this object!",
		    type: "warning",
		    showCancelButton: true,
		    confirmButtonColor: "#F6BB42",
		    confirmButtonText: "Yes, delete it!",
		    cancelButtonText: "No, cancel please!",
		    closeOnConfirm: false,
		    closeOnCancel: false
		}, function(isConfirm) {
		    if (isConfirm) {
		        swal("Deleted!", "Your object has been deleted.", "success");
		    } else {
		        swal("Cancelled", "Your object is safe :)", "error");
		    }
		});

	});

});